import { useCallback, useEffect, useState } from "react"
import "./CreateUpdate.css"
import { ICreatePostRequest, IPost, IUpdatePostRequest } from "../../../types/post.type"
import { createPost, updatePost } from "../../../api/post"

interface ICreateUpdateProps {
    editPost: IPost | null
    handleCreateUpdatePost: (value: IPost) => void
}

export default function CreateUpdate({ editPost, handleCreateUpdatePost }: ICreateUpdateProps): React.ReactElement {
    const [title, setTitle] = useState<string>("")
    const [body, setBody] = useState<string>("")
    useEffect(() => {
        if (editPost) {
            setTitle(editPost.title)
            setBody(editPost.body)
        }
    }, [editPost])
    const checkValid = useCallback(() => {
        return title.trim().length > 0 && body.trim().length > 0
    }, [title, body])
    const handleClick = useCallback(async () => {
        if (!checkValid()) {
            alert("Title and Body is required")
            return
        }
        let response: IPost | null = null
        if (editPost) {
            const postUpdate: IUpdatePostRequest = {
                id: editPost.id,
                userId: editPost.userId,
                title: title,
                body: body
            }
            response = await updatePost(postUpdate)
        } else {
            const postCreate: ICreatePostRequest = {
                userId: 1,
                title: title,
                body: body
            }
            response = await createPost(postCreate)
        }
        if (response) {
            setTitle("")
            setBody("")
            handleCreateUpdatePost({
                id: editPost ? editPost.id : Math.random(),
                userId: response.userId,
                title: response.title,
                body: response.body
            })
        } else {
            alert("Error create post")
        }
    }, [title, body])

    return (
        <div className="create-update">
            <h2>Post Manager</h2>
            <div className="input-data">
                <input className="title-input" value={title} type="text" placeholder="Title"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setTitle(e.target.value) }} />
                <textarea className="content-input" rows={5} placeholder="Body" value={body}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value)} />
                <button className="btn-create"
                    onClick={handleClick}>{editPost ? "Update" : "Create"}</button>
            </div>

        </div>
    )
}