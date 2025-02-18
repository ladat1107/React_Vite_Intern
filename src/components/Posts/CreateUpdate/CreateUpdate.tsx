import { useEffect } from "react"
import "./CreateUpdate.css"
import { ICreatePostRequest, IPost, IUpdatePostRequest } from "../../../types/post.type"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { PostSchema, TPostSchema } from "../../../schema/Post"
import { createPost, updatePost } from "../../../api/post"

interface ICreateUpdateProps {
    editPost: IPost | null
    handleCreateUpdatePost: (value: IPost) => void
}

export default function CreateUpdate({ editPost, handleCreateUpdatePost }: ICreateUpdateProps): React.ReactElement {
    const {
        formState: { errors },
        setValue,
        register,
        handleSubmit,
    } = useForm<TPostSchema>({
        resolver: zodResolver(PostSchema), // Apply the zodResolver
    });
    useEffect(() => {
        if (editPost) {
            setValue("title", editPost.title)
            setValue("body", editPost.body)
        }
    }, [editPost])

    const handleClick = async (value: TPostSchema) => {
        let response: IPost | null = null
        if (editPost) {
            const postUpdate: IUpdatePostRequest = {
                id: editPost.id,
                userId: editPost.userId,
                title: value.title,
                body: value.body
            }
            response = await updatePost(postUpdate)
        } else {
            const postCreate: ICreatePostRequest = {
                userId: 1,
                title: value.title,
                body: value.body
            }
            response = await createPost(postCreate)
        }
        if (response) {
            setValue("title", "")
            setValue("body", "")
            handleCreateUpdatePost({
                id: editPost ? editPost.id : Math.random(),
                userId: response.userId,
                title: response.title,
                body: response.body
            })
        } else {
            alert("Error create post")
        }
    }
    return (
        <div className="create-update">
            <h2>Post Manager</h2>
            <form onSubmit={handleSubmit(handleClick)}>
                <div className="input-data">
                    <input className="title-input" type="text" placeholder="Title" {...register("title")} />
                    {errors.title && <span className="error">{errors.title.message}</span>}
                    <textarea className="content-input" rows={5} placeholder="Body"  {...register("body")} />
                    <button className="btn-create" type="submit"
                    >{editPost ? "Update" : "Create"}</button>
                </div>
            </form>
        </div>
    )
}