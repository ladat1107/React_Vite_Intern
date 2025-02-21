import { useQueryClient } from "@tanstack/react-query";
import { IResponse } from "@/types/response.type";
import { useEffect, useState } from "react";
import { deleteSpecialty, updateSpecialty } from "@/api/specialty";
import { IRequestUpdateSpecialty, ISpecialty } from "@/types/specialty.type";
import { useForm } from "react-hook-form";
import { SpecialtySchema, TSpecialtySchema } from "@/schema/Specialty";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCustomMutation } from "@/hooks/useCustomMutation";
interface ISpecialtyProps {
    specialty: ISpecialty
}
export default function Specialty({ specialty }: ISpecialtyProps): React.ReactElement {
    const [isEdit, setEdit] = useState(false);
    const queryClient = useQueryClient()
    const {
        formState: { errors },
        setValue,
        register,
        handleSubmit,
    } = useForm<TSpecialtySchema>({ resolver: zodResolver(SpecialtySchema), });

    useEffect(() => {
        const messageError = errors.name?.message || errors.shortDescription?.message
        if (messageError) { alert(messageError) }
    }, [errors])

    const { mutate: mutateDelete } = useCustomMutation(deleteSpecialty, {
        onSuccess: (value: IResponse<string>) => {
            if (value.EC === 0) {
                queryClient.invalidateQueries({ queryKey: ['specialties'] })
            } else {
                alert(value.EM)
            }
        },
    })
    const handlEdit = () => {
        setEdit(true)
        setValue("name", specialty.name)
        setValue("shortDescription", specialty.shortDescription)
    }
    const { mutate: mutateUpdate } = useCustomMutation(updateSpecialty, {
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['specialties'] });
            setEdit(false)
        },
    });
    const handleUpdateSpecialty = async (value: TSpecialtySchema) => {
        let data: IRequestUpdateSpecialty = {
            id: specialty.id,
            name: value.name,
            shortDescription: value.shortDescription,
            image: specialty.image,
            status: 1,
        };
        mutateUpdate(data);
    }
    return (
        <div className="flex w-full my-3" data-testid="specialty">
            <img className="w-[150px] h-[150px] px-3" src={specialty?.image || ""} alt="specialty" />
            <div className="flex-col w-full p-5" >
                {isEdit ?
                    <form>
                        <input data-testid="input-name" type="text" placeholder="Title" {...register("name")} /> <hr />
                        <input data-testid="input-shortDescription" type="text" placeholder="shortDescription"  {...register("shortDescription")} />
                        <div className="flex justify-end mt-3">
                            <button data-testid="edit-btn" className="btn-edit" onClick={handleSubmit(handleUpdateSpecialty)} >Update</button>
                            <button className="btn-reset" onClick={() => setEdit(false)}>Cancle</button>
                        </div>
                    </form>
                    :
                    <>
                        <span data-testid="specialty-name">{specialty?.name}</span>
                        <hr />
                        <span data-testid="specialty-shortDescription">{specialty?.shortDescription}</span>
                        <div className="flex justify-end mt-3">
                            <button data-testid="edit-btn" className="btn-edit" onClick={() => handlEdit()} >Edit</button>
                            <button className="btn-delete" onClick={() => mutateDelete(specialty.id)}>Delete</button>
                        </div>
                    </>}
            </div>

        </div>
    )
}