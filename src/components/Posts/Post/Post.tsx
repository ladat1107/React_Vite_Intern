import { IPost } from "../../../types/post.type"
import "./Post.css"
interface PostProps {
    post: IPost,
    handleDeletePost: (id: number) => void
    handleEditPost: (post: IPost) => void
}

export default function Post({ post, handleEditPost, handleDeletePost }: PostProps): React.ReactElement {

    return (
        <div className="post">
            <div className="title">
                <span className="title-post">{post.title}</span>
                <div className="action">
                    <button onClick={() => handleEditPost(post)} className="edit btn">Edit</button>
                    <button onClick={() => handleDeletePost(post.id)} className="delete btn">Delete</button>
                </div>
            </div>
            <hr />
            <div className="content"> {post.body}</div>
            <br />
        </div>
    )
}