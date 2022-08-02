export enum ERole {
    CREATOR,
    ADMIN,
    USER,
}

export enum EGroup {
    CONTROL,
    MECHANIC,
    ELECTRONIC,
    TELECOMUNICATION,
    SECURITY,
    FINANCIAL,
}

export const EGROUPS_NAMES = [
    "کنترل",
    "مکانیک",
    "الکترونیک",
    "مخابرات",
    "امنیت",
    "مالی",
];

export enum EStatus {
    PENDING_FOR_SUPERVISOR,
    PENDING_FOR_FINANCIAL_MANAGER,
    PENDING_FOR_PAYMENT,
    COMPLETED,
    CANCELLED,
    FAILED,
}

export const ESTATUS_NAMES = [
    "در انتظار برای تایید سرپرست",
    "در انتظار برای تایید مدیر مالی",
    "در انتظار پرداخت",
    "تکمیل شده",
    "لغو شده",
    "ناموفق",
];

export interface IUser {
    id: string;
    fullName: string;
    email: string;
    password: string;
    userName: string;
    role: ERole;
    joinedAt: string;
    phoneNumber: string;
    group: EGroup;
}

export interface ICreateUser {
    fullName: string;
    email: string;
    password: string;
    userName: string;
    phoneNumber: string;
    group: EGroup;
}

export interface IProduct {
    id: string;
    name: string;
    price: string;
    date: string;
    count: number;
}

export interface IDBProduct {
    id: string;
    name: string;
    price: number;
    date: string;
    count: number;
}

export interface IOrder {
    id: string;
    user: IUser;
    products: IProduct[];
    description: string;
    date: string;
    status: EStatus;
    supervisor: IUser;
    officialBill: boolean;
}

export interface ICreateOrder {
    user: string;
    products: IProduct[];
    description: string;
    supervisor: string;
    officialBill: boolean;
}

export interface IDBOrder {
    id: string;
    user: string;
    products: IProduct[];
    description: string;
    date: string;
    status: EStatus;
    supervisor: string;
    officialBill: boolean;
}
