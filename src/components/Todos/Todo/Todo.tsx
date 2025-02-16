import "./Todo.css"
import { ITodoDataProps } from "../Todos"

interface ITodoProps {
    todo: ITodoDataProps
    handleChange: (todo: ITodoDataProps) => void
    handleDelete: (todo: ITodoDataProps) => void
}

export default function Todo({ todo, handleChange, handleDelete }: ITodoProps): React.ReactElement {
    console.log('render')
    return (
        <div key={todo.id} className="todo">
            <span className={todo.done ? "text-strike" : ""}>{todo.text}</span>
            <input type="checkbox" checked={todo.done} onChange={() => handleChange(todo)} />
            <button onClick={() => handleDelete(todo)}>Delete</button>
        </div>
    )
}