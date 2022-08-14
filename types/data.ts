export enum ERole {
    CREATOR,
    ADMIN,
    USER,
}

export enum EGroup {
    SYSTEM,
    MECHANIC,
    ECONOMIC_EXECUTIVE,
    TELECOMUNICATION,
    PRECISION_AGRICULTURE,
    MISSON_ANALYSIS,
    FINANCIAL,
}

export const EGROUPS_NAMES = [
    "مهندسی سامانه",
    "مکانیک",
    "اقتصادی و اجرایی",
    "مخابرات",
    "کشاورزی دقیق",
    "انالیز ماموریت",
    "مالی",
];

export enum EStatus {
    PENDING_FOR_SUPERVISOR,
    PENDING_FOR_FINANCIAL_MANAGER,
    PENDING_FOR_PAYMENT,
    COMPLETED,
    CANCELED,
    FAILED,
    REJECTED,
}

export const ESTATUS_NAMES = [
    "در انتظار برای تایید سرپرست",
    "در انتظار برای تایید مدیر مالی",
    "در انتظار پرداخت",
    "تکمیل شده",
    "لغو شده",
    "ناموفق",
    "رد شده",
];

export interface IUser {
    _id: string;
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
    key: string;
}

export interface IProduct {
    _id: string;
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
    _id: string;
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
    _id: string;
    id: string;
    user: string;
    products: IProduct[];
    description: string;
    date: string;
    status: EStatus;
    supervisor: string;
    officialBill: boolean;
}

export type UnCertainData<T> = T | undefined | null;