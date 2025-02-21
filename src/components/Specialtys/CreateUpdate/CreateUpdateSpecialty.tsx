import { useForm } from "react-hook-form";
import { SpecialtySchema, TSpecialtySchema } from "../../../schema/Specialty";
import { zodResolver } from "@hookform/resolvers/zod";
import "./CreateUpdateSpecialty.css";
import { IRequestCreateSpecialty } from "../../../types/specialty.type";
import { useQueryClient } from "@tanstack/react-query";
import { createSpecialty } from "../../../api/specialty";
import { useCustomMutation } from "@/hooks/useCustomMutation";


export default function CreateUpdateSpecialty(): React.ReactElement {
    const {
        formState: { errors },
        setValue,
        register,
        handleSubmit,
    } = useForm<TSpecialtySchema>({
        resolver: zodResolver(SpecialtySchema), // Apply the zodResolver
    });
    const queryClient = useQueryClient()

    const { mutate: mutationCreate } = useCustomMutation(createSpecialty, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['specialties'] })
            setValue("name", "")
            setValue("shortDescription", "")
        },
    })

    const handleClick = async (value: TSpecialtySchema) => {
        let data: IRequestCreateSpecialty = { name: value.name, shortDescription: value.shortDescription, image: "https://cdn-pkh.longvan.net/medpro-production/default/avatar/subjects/ho_hap.png", status: 1 }
        mutationCreate(data)
    }
    return (
        <div data-testid="create-update-specialty">
            <form>
                <div className="input-data">
                    <input className="title-input" type="text" placeholder="Title" {...register("name")} />
                    {errors.name && <span data-testid="error-input-name" className="text-red-600">{errors.name.message}</span>}
                    <textarea className="content-input" rows={5} placeholder="shortDescription"  {...register("shortDescription")} />
                    {errors.shortDescription && <span data-testid="error-input-shortDescription" className="text-red-600">{errors.shortDescription.message}</span>}
                    <button data-testid="upsert-specialty" className="btn-create" type="submit" onClick={handleSubmit(handleClick)}
                    >Create</button>
                </div>
            </form>
        </div>
    )
}