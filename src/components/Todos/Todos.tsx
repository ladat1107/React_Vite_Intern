import { useCallback, useEffect, useState } from "react"

import Input from "./Input/Input"
import Todo from "./Todo/Todo"

export interface ITodoDataProps {
    id: number
    text: string
    done: boolean

}

export default function Todos(): React.ReactElement {

    const [todos, setTodos] = useState<ITodoDataProps[]>([])

    useEffect(() => {
        const _todos = localStorage.getItem("todos")
        if (_todos?.length) {
            setTodos(JSON.parse(_todos))
        }
    }, [])
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])
    const handleClick = (value: string) => {

        let _todos = [...todos, { id: Math.random(), text: value, done: false }]
        setTodos(_todos)
    }
    const handleChange = useCallback((todo: ITodoDataProps) => {
        const newTodos = todos.map((t) => {
            if (t.id === todo.id) {
                return { ...t, done: !t.done }
            }
            return t
        })
        setTodos(newTodos)
    }, [])



    const handleDelete = useCallback((todo: ITodoDataProps) => {
        const newTodos = todos.filter((t) => t.id !== todo.id)
        setTodos(newTodos)
    }, [])

    const [count, setCount] = useState(0);
    return (
        <div>
            <div onClick={() => setCount(count + 1)}>{count}</div>
            <Input onClick={handleClick} />
            <div className="todo-list">
                {todos.map((todo: ITodoDataProps) => {
                    return <Todo todo={todo} handleChange={handleChange} handleDelete={handleDelete} />
                })}
            </div>
        </div>

    )
}