
export interface IPost {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface ICreatePostRequest {
    userId: number;
    title: string
    body: string
}

export interface IUpdatePostRequest {
    id: number
    userId: number
    title: string
    body: string
}


