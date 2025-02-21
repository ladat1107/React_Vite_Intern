import { useQuery } from "@tanstack/react-query"
import Specialty from "./Specialty/Specialty"
import CreateUpdateSpecialty from "./CreateUpdate/CreateUpdateSpecialty"
import { getAllSpecialty } from "../../api/specialty"

export default function Specialtys(): React.ReactElement {
    const { data: dataSpecialty } = useQuery({ queryKey: ['specialties'], queryFn: getAllSpecialty })

    return (
        <div className="p-20">
            <div className="font-roboto text-3xl font-bold underline mb-5 text-center">Specialty</div>
            <CreateUpdateSpecialty />
            <div className="w-full px-2 mt-10">
                {dataSpecialty?.EC === 0 && dataSpecialty?.DT?.count > 0 ?
                    dataSpecialty?.DT?.rows?.map((item, index) =>
                        <Specialty key={index} specialty={item} />) :
                    <div className="text-center">No data</div>
                }
            </div>
        </div>

    )
}
