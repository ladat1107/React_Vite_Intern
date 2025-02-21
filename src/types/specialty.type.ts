
export interface ISpecialty {
    id: number;
    name: string;
    shortDescription: string;
    image: string;
    status: number;
}

export interface IResponseSpecialty {
    count: number | 0;
    rows: ISpecialty[] | [];
}

export interface IRequestCreateSpecialty {
    name: string;
    shortDescription: string;
    image: string;
    status: number;
}

export interface IRequestUpdateSpecialty {
    id: number;
    name?: string;
    shortDescription?: string;
    image?: string;
    status?: number;
}
