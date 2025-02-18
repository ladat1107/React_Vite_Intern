import { ISpecialty } from "../../../types/specialty.type";
import "./Specialty.css";
interface ISpecialtyProps {
    specialty: ISpecialty,
    handlEdit: (specialty: ISpecialty) => void,
    handleDelete: (id: number) => void
}

export default function Specialty({ specialty, handlEdit, handleDelete }: ISpecialtyProps): React.ReactElement {
    return (
        <div className="specialty">
            <img className="img-specailty" src={specialty?.image || ""} alt="specialty" />
            <div className="content">
                <span>{specialty?.name}</span>
                <hr />
                <p>{specialty?.shortDescription}</p>
                <div className="action">
                    <button className="btn-edit" onClick={() => handlEdit(specialty)} >Edit</button>
                    <button className="btn-delete" onClick={() => handleDelete(specialty.id)}>Delete</button>
                </div>
            </div>

        </div>

    )
}