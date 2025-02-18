import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteSpecialty, getAllSpecialty } from "../../api/specialty"
import Specialty from "./Specialty/Specialty"
import "./Specialty/Specialty.css"
import CreateUpdateSpecialty from "./CreateUpdate/CreateUpdateSpecialty"
import { ISpecialty } from "../../types/specialty.type"
import { useState } from "react"


export default function Specialtys(): React.ReactElement {
    // Queries
    const { data: dataSpecialty } = useQuery({ queryKey: ['specialties'], queryFn: getAllSpecialty })

    const [specialtyEdit, setSpecialtyEdit] = useState<ISpecialty | null>(null)
    const queryClient = useQueryClient()
    const useDelete = useMutation({
        mutationFn: deleteSpecialty,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['specialties'] })
        },
        onError: (error) => {
            console.error(error)
        }
    })
    const handleDelete = async (id: number) => {
        useDelete.mutate(id)
    }
    const handleEdit = (specialty: ISpecialty) => {
        setSpecialtyEdit(specialty)
    }
    return (
        <>
            <div className="font-roboto text-3xl font-bold underline mb-5">Specialty</div>
            <CreateUpdateSpecialty specialtyEdit={specialtyEdit} />
            <div className="specialtys">
                {dataSpecialty?.EC === 0 && dataSpecialty?.DT?.rows?.map((item, index) =>
                    <Specialty key={index} specialty={item} handleDelete={handleDelete} handlEdit={handleEdit} />)
                }
            </div>
        </>

    )
}