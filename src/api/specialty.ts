import { IResponse } from "../types/response.type"
import { IRequestCreateSpecialty, IRequestUpdateSpecialty, IResponseSpecialty } from "../types/specialty.type"
import http from "../utils/http"

export async function getAllSpecialty(): Promise<IResponse<IResponseSpecialty>> {
    const response = await http.get<IResponse<IResponseSpecialty>>('/api/admin/getAllSpecialtyAdmin')
    return response.data
}

export async function createSpecialty(data: IRequestCreateSpecialty): Promise<IResponse<IResponseSpecialty>> {
    const response = await http.post<IResponse<IResponseSpecialty>>('/api/admin/createSpecialty', data)
    return response.data
}

export async function updateSpecialty(data: IRequestUpdateSpecialty): Promise<IResponse<IResponseSpecialty>> {
    const response = await http.put<IResponse<IResponseSpecialty>>('/api/admin/updateSpecialty', data)
    return response.data
}

export async function deleteSpecialty(id: number): Promise<IResponse<IResponseSpecialty>> {
    const response = await http.delete<IResponse<IResponseSpecialty>>(`/api/admin/deleteSpecialty`, { data: { id } })
    return response.data

}

