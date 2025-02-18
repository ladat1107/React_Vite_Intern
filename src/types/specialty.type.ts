
export interface ISpecialty {
    id: number;
    name: string;
    shortDescription: string;
    image: string;
    status: number;
    createdAt: string;
    updatedAt: string;
}

export interface IResponseSpecialty {
    count: number | null;
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
    name: string;
    shortDescription: string;
    image: string;
    status: number;
}
