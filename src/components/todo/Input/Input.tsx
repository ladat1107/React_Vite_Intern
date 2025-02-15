import { useState } from "react"
import "./Input.css"

export interface ITodoInputProps {
    onClick: (value: string) => void
}


export default function Input({ onClick }: ITodoInputProps): React.ReactElement {
    const [text, setText] = useState<string>("")

    return (
        <div className="input-todo">
            <input type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)} />
            <button onClick={() => onClick(text)}>Add</button>
        </div>
    )
}