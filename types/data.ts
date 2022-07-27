export enum ERole {
    CREATOR,
    ADMIN,
    USER,
}

export enum EStatus {
    PENDING,
    COMPLETED,
    CANCELLED,
    FAILED,
}

export interface IUser {
    id: number;
    fullName: string;
    email: string;
    password: string;
    userName: string;
    role: ERole;
    joinedAt: string;
    phoneNumber: string;
}

export interface IProduct {
    id: number;
    name: string;
    price: number;
    date: string;
}

export interface IOrder {
    id: number;
    user: IUser;
    products: IProduct[];
    description: string;
    date: string;
    status: EStatus;
    supervisor: IUser;
}
