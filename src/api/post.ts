import http from "../utils/http"
import {
    ICreatePostRequest,
    IPost,
    IUpdatePostRequest,
} from '../types/post.type'

export async function getAllPostes(): Promise<IPost[]> {
    const response = await http.get<IPost[]>('/posts')
    return response.data
}

export async function createPost(
    params: ICreatePostRequest,
): Promise<IPost> {
    const response = await http.post<IPost>('/posts', params)
    return response.data
}

export async function updatePost(
    data: IUpdatePostRequest,
): Promise<IPost> {
    const response = await http.patch<IPost>(
        `/posts/${data.id}`,
        data,
    )
    return response.data
}

export async function deletePost(): Promise<null> {
    const response = await http.delete<null>(`/posts/1`)
    return response.data
}
