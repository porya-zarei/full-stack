import {Product} from "@prisma/client";

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
    id: string;
    fullName: string;
    email: string;
    password: string;
    userName: string;
    role: ERole;
    joinedAt: string;
    phoneNumber: string;
}

export interface IProduct {
    id: string;
    name: string;
    price: number;
    date: string;
}

export interface IDBProduct {
    id: string;
    name: string;
    price: number;
    date: string;
}

export interface IOrder {
    id: string;
    user: IUser;
    products: IProduct[];
    description: string;
    date: string;
    status: EStatus;
    supervisor: IUser;
}

export interface IDBOrder {
    id: string;
    user: string;
    products: IProduct[];
    description: string;
    date: string;
    status: EStatus;
    supervisor: string;
}
