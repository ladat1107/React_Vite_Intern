import { useForm } from "react-hook-form";
import { SpecialtySchema, TSpecialtySchema } from "../../../schema/Specialty";
import { zodResolver } from "@hookform/resolvers/zod";
import "./CreateUpdateSpecialty.css";
import { IRequestCreateSpecialty, IRequestUpdateSpecialty, ISpecialty } from "../../../types/specialty.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSpecialty, updateSpecialty } from "../../../api/specialty";
import { useEffect } from "react";


export default function CreateUpdateSpecialty({ specialtyEdit }: { specialtyEdit: ISpecialty | null }): React.ReactElement {
    const {
        formState: { errors },
        setValue,
        register,
        handleSubmit,
    } = useForm<TSpecialtySchema>({
        resolver: zodResolver(SpecialtySchema), // Apply the zodResolver
    });
    const queryClient = useQueryClient()
    
    useEffect(() => {
        if (specialtyEdit) {
            setValue("name", specialtyEdit.name)
            setValue("shortDescription", specialtyEdit.shortDescription)
        }
    }, [specialtyEdit])

    const mutationCreate = useMutation({
        mutationFn: createSpecialty,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['specialties'] })
            setValue("name", "")
            setValue("shortDescription", "")
        },
        onError: (error) => {
            console.error(error)
        }
    })
    const mutationEdit = useMutation({
        mutationFn: updateSpecialty,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['specialties'] })
            setValue("name", "")
            setValue("shortDescription", "")
        },
        onError: (error) => {
            console.error(error)
        }
    })
    const handleClick = async (value: TSpecialtySchema) => {
        if (specialtyEdit) {
            let data: IRequestUpdateSpecialty = { id: specialtyEdit.id, name: value.name, shortDescription: value.shortDescription, image: "https://cdn-pkh.longvan.net/medpro-production/default/avatar/subjects/ho_hap.png", status: 1 }
            mutationEdit.mutate(data)
        } else {
            let data: IRequestCreateSpecialty = { name: value.name, shortDescription: value.shortDescription, image: "https://cdn-pkh.longvan.net/medpro-production/default/avatar/subjects/ho_hap.png", status: 1 }
            mutationCreate.mutate(data)
        }
    }
    return (
        <div>
            <form>
                <div className="input-data">
                    <input className="title-input" type="text" placeholder="Title" {...register("name")} />
                    {errors.name && <span className="error">{errors.name.message}</span>}
                    <textarea className="content-input" rows={5} placeholder="shortDescription"  {...register("shortDescription")} />
                    {errors.shortDescription && <span className="error">{errors.shortDescription.message}</span>}
                    <button className="btn-create" type="submit" onClick={handleSubmit(handleClick)}
                    >{specialtyEdit ? "Update" : "Create"}</button>
                </div>
            </form>
        </div>
    )
}