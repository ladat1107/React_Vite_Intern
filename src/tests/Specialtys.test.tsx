import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Specialtys from "../components/Specialtys/Specialtys";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { getAllSpecialty, deleteSpecialty, createSpecialty, updateSpecialty } from "../api/specialty";
import { IResponse } from "@/types/response.type";
import { IResponseSpecialty, ISpecialty } from "@/types/specialty.type";
import Specialty from "../components/Specialtys/Specialty/Specialty";
import exp from "constants";


vi.mock('../api/specialty');

const createTestQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

describe("Specialtys Component", () => {
    beforeEach(() => { vi.resetAllMocks(); });
    afterEach(() => { vi.resetAllMocks(); });

    const queryClient = createTestQueryClient();
    const mockData: IResponse<IResponseSpecialty> = {
        EC: 0,
        EM: "Lấy thông tin chuyên khoa thành công",
        DT: {
            count: 42,
            rows: [
                {
                    id: 3,
                    name: "Tiêu Hóa Gan Mật",
                    image: "https://cdn-pkh.longvan.net/medpro-production/umc/subjects/1655710722460-TIEU_HOA_GAN_MAT.png",
                    shortDescription: "Đau bụng, tiêu chảy, buồn nôn, nôn, đầy hơi, khó tiêu, vàng da, nước tiểu sẫm màu, mất cảm giác thèm ăn, chướng bụng, ợ chua, phân có máu, mệt mỏi, chán ăn, xuất huyết tiêu hóa, trào ngược dạ dày, sỏi mật, viêm tụy cấp",
                    status: 1,
                },
                {
                    id: 4,
                    name: "Nội Tổng Quát1",
                    image: "https://cdn-pkh.longvan.net/medpro-production/default/avatar/subjects/noi_tong_quat.png",
                    shortDescription: "Sốt cao, đau đầu, chóng mặt, mệt mỏi, ho khan, đau ngực, khó thở, buồn nôn, đổ mồ hôi đêm, đau nhức cơ thể, đau họng, mất ngủ, suy giảm trí nhớ, viêm họng, viêm phổi, nhiễm trùng cơ thể",
                    status: 1,
                },
            ],
        },
    };
    const renderUI = () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Specialtys />
            </QueryClientProvider>
        );
    };

    test('Should render UI and get all specialty', async () => {
        vi.mocked(getAllSpecialty).mockResolvedValue(mockData);
        renderUI();

        const result = await getAllSpecialty();
        expect(result).toEqual(mockData);
    });

    test("Should render UI and get empty specialty ", async () => {
        const mockDataEmpty = {
            EC: 0,
            EM: "Lấy thông tin chuyên khoa thành công",
            DT: {
                count: 0,
                rows: [],
            },
        }
        vi.mocked(getAllSpecialty).mockResolvedValue(mockDataEmpty);
        renderUI();
        await waitFor(() => {
            expect(vi.mocked(getAllSpecialty).mock.calls.length).toBe(1);
            expect(screen.getByText("No data")).toBeInTheDocument();
        });
    })

    test("Shoule render UI and insert new specialty", async () => {
        const mockDataInsert: IResponse<ISpecialty> = {
            EC: 0,
            EM: "Thêm chuyên khoa thành công",
            DT: {
                id: 5,
                name: "Chuyên khoa mới",
                shortDescription: "Sốt cao, đau đầu, chóng mặt, mệt mỏi, ho khan, đau ngực, khó thở, buồn nôn, đổ mồ hôi đêm, đau nhức cơ thể, đau họng, mất ngủ, suy giảm trí nhớ, viêm họng, viêm phổi, nhiễm trùng cơ thể",
                image: "https://cdn-pkh.longvan.net/medpro-production/default/avatar/subjects/noi_tong_quat.png",
                status: 1,
            }
        }
        const updatedMockData = {
            ...mockData,
            DT: {
                ...mockData.DT,
                rows: [...mockData.DT.rows, mockDataInsert.DT],
            },
        };
        vi.mocked(createSpecialty).mockResolvedValue(mockDataInsert);
        vi.mocked(getAllSpecialty).mockResolvedValueOnce(mockData).mockResolvedValueOnce(updatedMockData);
        renderUI();
        await waitFor(() => {
            expect(vi.mocked(getAllSpecialty).mock.calls.length).toBe(1);
        });

        const createUpdateSpecialty = screen.getByTestId("create-update-specialty");
        expect(createUpdateSpecialty).toBeInTheDocument();

        const nameInput = screen.getByPlaceholderText("Title");
        const descriptionInput = screen.getByPlaceholderText("shortDescription");
        const submitButton = screen.getByTestId("upsert-specialty");

        fireEvent.change(nameInput, { target: { value: "Chuyên khoa mới" } });
        fireEvent.change(descriptionInput, { target: { value: "Sốt cao, đau đầu, chóng mặt, mệt mỏi, ho khan, đau ngực, khó thở, buồn nôn, đổ mồ hôi đêm, đau nhức cơ thể, đau họng, mất ngủ, suy giảm trí nhớ, viêm họng, viêm phổi, nhiễm trùng cơ thể" } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(vi.mocked(createSpecialty).mock.calls.length).toBe(1);
            expect(vi.mocked(createSpecialty).mock.calls[0][0]).toEqual({
                name: "Chuyên khoa mới",
                shortDescription: "Sốt cao, đau đầu, chóng mặt, mệt mỏi, ho khan, đau ngực, khó thở, buồn nôn, đổ mồ hôi đêm, đau nhức cơ thể, đau họng, mất ngủ, suy giảm trí nhớ, viêm họng, viêm phổi, nhiễm trùng cơ thể",
                image: "https://cdn-pkh.longvan.net/medpro-production/default/avatar/subjects/ho_hap.png",
                status: 1
            });
            expect(vi.mocked(createSpecialty).mockResolvedValue(mockDataInsert));
            expect(vi.mocked(getAllSpecialty).mock.calls.length).toBe(2);
            expect(screen.getByText("Chuyên khoa mới")).toBeInTheDocument();
        });
    })

    test("Should display error input-name is invalid when insert", async () => {
        vi.mocked(getAllSpecialty).mockResolvedValue(mockData);
        renderUI();

        await waitFor(() => {
            expect(vi.mocked(getAllSpecialty).mock.calls.length).toBe(1);
        });
        const nameInput = screen.getByPlaceholderText("Title");
        const buttonCreate = screen.getByTestId("upsert-specialty");

        fireEvent.change(nameInput, { target: { value: "" } });
        fireEvent.click(buttonCreate);

        await waitFor(() => {
            const errorInputName = screen.getByTestId("error-input-name");
            expect(errorInputName).toBeInTheDocument();
        });
    });

    test("Should display error input-shortDescription is invalid when insert", async () => {
        vi.mocked(getAllSpecialty).mockResolvedValue(mockData);
        renderUI();

        await waitFor(() => {
            expect(vi.mocked(getAllSpecialty).mock.calls.length).toBe(1);
        });
        const nameInput = screen.getByPlaceholderText("Title");
        const shortDescription = screen.getByPlaceholderText("shortDescription");
        const buttonCreate = screen.getByTestId("upsert-specialty");

        fireEvent.change(nameInput, { target: { value: "4444444444" } });
        fireEvent.change(shortDescription, { target: { value: "" } });
        fireEvent.click(buttonCreate);

        await waitFor(() => {
            const errorInputName = screen.getByTestId("error-input-shortDescription");
            expect(errorInputName).toBeInTheDocument();
        });
    });

    test("Should render UI and update specialty", async () => {
        const mockDataUpdate: IResponse<string> = {
            EC: 0,
            EM: "Cập nhật chuyên khoa thành công",
            DT: ""
        };
        const updatedMockData: IResponse<IResponseSpecialty> = {
            ...mockData,
            DT: {
                ...mockData.DT,
                rows: mockData.DT.rows.map(specialty => specialty.id === 3 ? {
                    ...specialty,
                    name: "Tiêu Hóa Gan Mật Update",
                } : specialty),
            },
        };

        vi.mocked(getAllSpecialty).mockResolvedValueOnce(mockData).mockResolvedValueOnce(updatedMockData);
        vi.mocked(updateSpecialty).mockResolvedValue(mockDataUpdate);
        renderUI();

        await waitFor(() => {
            expect(vi.mocked(getAllSpecialty).mock.calls.length).toBe(1);
        });

        const updateButton = await waitFor(() => screen.getAllByText("Edit")[0]);
        updateButton.click();


        await waitFor(() => {
            const nameInput = screen.getAllByTestId("input-name")[0];
            const descriptionInput = screen.getAllByTestId("input-shortDescription")[0];
            const submitButton = screen.getAllByTestId("edit-btn")[0];

            expect(nameInput).toHaveValue("Tiêu Hóa Gan Mật");
            expect(descriptionInput).toHaveValue("Đau bụng, tiêu chảy, buồn nôn, nôn, đầy hơi, khó tiêu, vàng da, nước tiểu sẫm màu, mất cảm giác thèm ăn, chướng bụng, ợ chua, phân có máu, mệt mỏi, chán ăn, xuất huyết tiêu hóa, trào ngược dạ dày, sỏi mật, viêm tụy cấp");
            fireEvent.change(nameInput, { target: { value: "Tiêu Hóa Gan Mật Update" } });
            fireEvent.click(submitButton);
        });

        await waitFor(() => {
            expect(vi.mocked(updateSpecialty).mock.calls.length).toBe(1);
            expect(vi.mocked(updateSpecialty).mock.calls[0][0]).toEqual({
                id: 3,
                name: "Tiêu Hóa Gan Mật Update",
                shortDescription: "Đau bụng, tiêu chảy, buồn nôn, nôn, đầy hơi, khó tiêu, vàng da, nước tiểu sẫm màu, mất cảm giác thèm ăn, chướng bụng, ợ chua, phân có máu, mệt mỏi, chán ăn, xuất huyết tiêu hóa, trào ngược dạ dày, sỏi mật, viêm tụy cấp",
                image: "https://cdn-pkh.longvan.net/medpro-production/umc/subjects/1655710722460-TIEU_HOA_GAN_MAT.png",
                status: 1
            });
            expect(vi.mocked(updateSpecialty).mockResolvedValueOnce(mockDataUpdate))
            expect(vi.mocked(getAllSpecialty).mock.calls.length).toBe(2);
            expect(screen.getByText("Tiêu Hóa Gan Mật Update")).toBeInTheDocument();
        })
    });

    test("Should alert when input-name-update is invalid", async () => {
        const alertMock = vi.spyOn(window, "alert").mockImplementation(() => { });

        vi.mocked(getAllSpecialty).mockResolvedValueOnce(mockData)
        renderUI();

        await waitFor(() => {
            expect(vi.mocked(getAllSpecialty).mock.calls.length).toBe(1);
        });

        const updateButton = await waitFor(() => screen.getAllByText("Edit")[0]);
        updateButton.click();

        await waitFor(() => {
            const nameInput = screen.getAllByTestId("input-name")[0];
            const descriptionInput = screen.getAllByTestId("input-shortDescription")[0];
            const submitButton = screen.getAllByTestId("edit-btn")[0];

            expect(nameInput).toHaveValue("Tiêu Hóa Gan Mật");
            expect(descriptionInput).toHaveValue("Đau bụng, tiêu chảy, buồn nôn, nôn, đầy hơi, khó tiêu, vàng da, nước tiểu sẫm màu, mất cảm giác thèm ăn, chướng bụng, ợ chua, phân có máu, mệt mỏi, chán ăn, xuất huyết tiêu hóa, trào ngược dạ dày, sỏi mật, viêm tụy cấp");
            fireEvent.change(nameInput, { target: { value: "" } });
            fireEvent.click(submitButton);
        });

        await waitFor(() => {
            expect(alertMock).toHaveBeenCalledWith("Name is required");
        })
    })

    test("Should alert when input-shortDescription-update is invalid", async () => {
        const alertMock = vi.spyOn(window, "alert").mockImplementation(() => { });

        vi.mocked(getAllSpecialty).mockResolvedValueOnce(mockData)
        renderUI();

        await waitFor(() => {
            expect(vi.mocked(getAllSpecialty).mock.calls.length).toBe(1);
        });

        const updateButton = await waitFor(() => screen.getAllByText("Edit")[0]);
        updateButton.click();

        await waitFor(() => {
            const nameInput = screen.getAllByTestId("input-name")[0];
            const descriptionInput = screen.getAllByTestId("input-shortDescription")[0];
            const submitButton = screen.getAllByTestId("edit-btn")[0];

            expect(nameInput).toHaveValue("Tiêu Hóa Gan Mật");
            expect(descriptionInput).toHaveValue("Đau bụng, tiêu chảy, buồn nôn, nôn, đầy hơi, khó tiêu, vàng da, nước tiểu sẫm màu, mất cảm giác thèm ăn, chướng bụng, ợ chua, phân có máu, mệt mỏi, chán ăn, xuất huyết tiêu hóa, trào ngược dạ dày, sỏi mật, viêm tụy cấp");
            fireEvent.change(descriptionInput, { target: { value: "" } });
            fireEvent.click(submitButton);
        });

        await waitFor(() => {
            expect(alertMock).toHaveBeenCalledWith("Short Description is required");
        })
    })

    test("Should delete specialty from specialty list", async () => {
        vi.mocked(getAllSpecialty).mockResolvedValue(mockData);
        vi.mocked(deleteSpecialty).mockResolvedValue({ EC: 0, EM: "Xóa chuyên khoa thành công", DT: "" });

        renderUI();

        const deleteButton = await waitFor(() => screen.getAllByText("Delete")[0]);
        deleteButton.click();

        await waitFor(() => expect(vi.mocked(deleteSpecialty).mock.calls.length).toBe(1));

        // Mock the updated data after deletion
        const updatedData = {
            ...mockData,
            DT: {
                ...mockData.DT,
                rows: mockData.DT.rows.filter(specialty => specialty.id !== 3),
            },
        };

        vi.mocked(getAllSpecialty).mockResolvedValue(updatedData);

        // Re-render the component to reflect the updated data
        renderUI();

        await waitFor(() => {
            expect(screen.queryByText("Tiêu Hóa Gan Mật")).toBeNull();
        });
    });

    test("Should alert when EC is not 0", async () => {
        const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => { });

        vi.mocked(deleteSpecialty).mockResolvedValue({
            EC: 400,
            EM: "Xóa chuyên khoa thất bại",
            DT: ""
        });

        renderUI();
        const deleteButton = await waitFor(() => screen.getAllByText("Delete")[0]);
        deleteButton.click();

        await waitFor(() => {
            expect(vi.mocked(deleteSpecialty).mock.calls.length).toBe(1);
            expect(alertMock).toHaveBeenCalledWith("Xóa chuyên khoa thất bại");
        });

        alertMock.mockRestore();
    });

    test("Should handle error when delete specialty fails", async () => {
        const consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => { });

        vi.mocked(deleteSpecialty).mockRejectedValue(new Error("Delete specialty failed1"));

        renderUI();
        const deleteButton = await waitFor(() => screen.getAllByText("Delete")[0]);
        deleteButton.click();

        await waitFor(() => {
            expect(vi.mocked(deleteSpecialty).mock.calls.length).toBe(1);
            expect(consoleErrorMock).toHaveBeenCalledWith(new Error("Delete specialty failed1"));
        });

        consoleErrorMock.mockRestore();
    });
});