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

export interface IProductCategory {
    _id: string;
    id: string;
    group: EGroup;
    key: string;
    name: string;
}

export type ICreateProductCategory = Omit<IProductCategory, "_id"|"id">;

export const PRODUCT_CATEGORIES: IProductCategory[] = [
    {
        group: EGroup.SYSTEM,
        id: "system",
        key: "system",
        name: "مهندسی سامانه",
        _id: "5e9f8f8f9f8f8f8f8f8f8f8",
    },
    {
        group: EGroup.MECHANIC,
        id: "mechanic",
        key: "mechanic",
        name: "مکانیک",
        _id: "5e9f8f8f9f8f8f8f8f8f8f9",
    },
    {
        group: EGroup.ECONOMIC_EXECUTIVE,
        id: "economicExecutive",
        key: "economicExecutive",
        name: "اقتصادی و اجرایی",
        _id: "5e9f8f8f9f8f8f8f8f8f8fa",
    },
];

export enum EProductType {
    CONSUMPTION, // مصرفی
    EQUIPMENT,// تجهیزات
}

export const EPRODUCT_TYPES_NAMES = [
    "مصرفی",
    "تجهیزات",
]

export interface IProduct {
    _id: string;
    id: string;
    name: string;
    price: string;
    date: string;
    count: number;
    category: IProductCategory;
    type:EProductType;
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
