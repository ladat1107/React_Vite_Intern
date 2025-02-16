import { useCallback, useEffect, useState } from "react"
import { deletePost, getAllPostes } from "../../api/post"
import { IPost } from "../../types/post.type"
import Post from "./Post/Post"
import CreateUpdate from "./CreateUpdate/CreateUpdate"

export default function Posts(): React.ReactElement {
    const [posts, setPosts] = useState<IPost[]>([])
    const [editPost, setEditPost] = useState<IPost | null>(null)
    useEffect(() => {
        fetchPosts()
    }, [])
    const fetchPosts = useCallback(async () => {
        const response = await getAllPostes()
        if (response) {
            setPosts(response)
        }
    }, [])
    const handleCreateUpdatePost = useCallback(
        (value: IPost) => {
            if (editPost) {
                setPosts((prev) => prev.map((post) => post.id === value.id ? { ...post, title: value.title, body: value.body } : post))
                setEditPost(null)
            } else {
                setPosts((prev) => [value, ...prev])
            }
        }, [editPost, setPosts])
    const handleDeletePost = useCallback(
        async (id: number) => {
            await deletePost()
            setPosts((prev) => prev.filter((post) => post.id !== id))
        }, [])
    const handleEditPost = useCallback((post: IPost) => {
        setEditPost(post)
    }, [])

    return (
        <div>
            <div>
                <CreateUpdate
                    editPost={editPost}
                    handleCreateUpdatePost={handleCreateUpdatePost} />
            </div>
            <div className="posts">
                <h2>List Posts</h2>
                {posts?.length > 0 && posts.map((post) =>
                    <Post key={post.id}
                        post={post}
                        handleDeletePost={handleDeletePost}
                        handleEditPost={handleEditPost} />
                )}
            </div>
        </div>
    )
}