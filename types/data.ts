export enum ERole {
    CREATOR,
    ADMIN,
    USER,
}

// export enum EGroup {
//     SYSTEM,
//     MECHANIC,
//     ECONOMIC_EXECUTIVE,
//     TELECOMUNICATION,
//     PRECISION_AGRICULTURE,
//     MISSON_ANALYSIS,
//     FINANCIAL,
// }

// export const EGROUPS_NAMES = [
//     "مهندسی سامانه",
//     "مکانیک",
//     "اقتصادی و اجرایی",
//     "مخابرات",
//     "کشاورزی دقیق",
//     "انالیز ماموریت",
//     "مالی",
// ];

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
    group: IGroup;
}

export interface ICreateUser {
    fullName: string;
    email: string;
    password: string;
    userName: string;
    phoneNumber: string;
    group: string;
    key: string;
}

export interface IDBUser {
    _id: string;
    id: string;
    fullName: string;
    email: string;
    password: string;
    userName: string;
    role: ERole;
    joinedAt: string;
    phoneNumber: string;
    group: string;
}

export interface IProductCategory {
    _id: string;
    id: string;
    group: IGroup;
    key: string;
    name: string;
}

export type ICreateProductCategory = Omit<
    IProductCategory,
    "_id" | "id" | "group"
> & {group: string};

export interface IDBProductCategory {
    _id: string;
    id: string;
    group: string;
    key: string;
    name: string;
}

export enum EProductType {
    CONSUMPTION, // مصرفی
    EQUIPMENT, // تجهیزات
}

export const EPRODUCT_TYPES_NAMES = ["مصرفی", "تجهیزات"];

export interface IProduct {
    _id: string;
    id: string;
    name: string;
    price: string;
    date: string;
    count: number;
    category: IProductCategory;
    type: EProductType;
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
    isExtra: boolean;
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
    isExtra: boolean;
}

export interface IMoneyLimitYear {
    _id?: string;
    year: string;
    limit: string;
}

export type ICreateMoneyLimitYear = Omit<IMoneyLimitYear, "_id">;

export interface IGroup {
    _id: string;
    id: string;
    name: string;
    moneyLimitYears: Array<IMoneyLimitYear>;
}

export interface ICreateGroup {
    name: string;
    moneyLimitYears: Array<ICreateMoneyLimitYear>;
}

export type UnCertainData<T> = T | undefined | null;
