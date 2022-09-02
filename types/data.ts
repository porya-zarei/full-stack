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

export interface ICreateProduct {
    id: string;
    name: string;
    price: string;
    date: string;
    count: number;
    category: IDBProductCategory;
    type: EProductType;
}

export interface IDBProduct {
    id: string;
    name: string;
    price: string;
    date: string;
    count: number;
    category: IDBProductCategory;
    type: EProductType;
}

export interface IProduct {
    _id?: string;
    id: string;
    name: string;
    price: string;
    date: string;
    count: number;
    category: IDBProductCategory;
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
    invoice?: string;
    responseText?: string;
}

export interface ICreateOrder {
    user: string;
    products: ICreateProduct[];
    description: string;
    supervisor: string;
    officialBill: boolean;
    invoice?: string;
}

export interface IDBOrder {
    _id: string;
    id: string;
    user: string;
    products: IDBProduct[];
    description: string;
    date: string;
    status: EStatus;
    supervisor: string;
    officialBill: boolean;
    isExtra: boolean;
    invoice?: string;
    responseText?: string;
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

export enum ETransactionStatus {
    IN_CONFIRMED,
    OUT_CONFIRMED,
    PENDING_FOR_SUPERVISOR_CONFIRM_IN,
    PENDING_FOR_SUPERVISOR_CONFIRM_OUT,
    PENDING_FOR_CONFIRM_IN,
    PENDING_FOR_CONFIRM_OUT,
    CANCELED_BY_SUPERVISOR,
    DENIED_IN,
    DENIED_OUT,
}

export enum ETransactionStatus_ADMIN {
    PENDING_FOR_SUPERVISOR_CONFIRM_IN = ETransactionStatus.PENDING_FOR_SUPERVISOR_CONFIRM_IN,
    PENDING_FOR_SUPERVISOR_CONFIRM_OUT = ETransactionStatus.PENDING_FOR_SUPERVISOR_CONFIRM_OUT,
    PENDING_FOR_CONFIRM_IN = ETransactionStatus.PENDING_FOR_CONFIRM_IN,
    PENDING_FOR_CONFIRM_OUT = ETransactionStatus.PENDING_FOR_CONFIRM_OUT,
    CANCELED_BY_SUPERVISOR = ETransactionStatus.CANCELED_BY_SUPERVISOR,
}

export enum ETransactionStatus_CREATOR {
    PENDING_FOR_CONFIRM_IN = ETransactionStatus.PENDING_FOR_CONFIRM_IN,
    PENDING_FOR_CONFIRM_OUT = ETransactionStatus.PENDING_FOR_CONFIRM_OUT,
    DENIED_IN = ETransactionStatus.DENIED_IN,
    DENIED_OUT = ETransactionStatus.DENIED_OUT,
}

export const ETRANSACTION_STATUS_NAMES = [
    "تایید ورود",
    "تایید خروج",
    "در انتظار تایید سرپرست ورود",
    "در انتظار تایید سرپرست خروج",
    "در انتظار تایید ورود",
    "در انتظار تایید خروج",
    "لغو شده توسط سرپرست",
    "رد شده ورود",
    "رد شده خروج",
];

export enum EProductTransactionType {
    TYPE1,
    TYPE2,
    TYPE3,
    TYPE4,
    TYPE5,
}

export const ETRANSACTION_TYPE_NAMES = [
    "انبار اصلی",
    "امانی",
    "انبار 1",
    "انبار 2",
    "انبار 3",
];

export interface IProductTransaction {
    _id: string;
    id: string;
    user: IUser;
    product: string;
    description: string;
    date: string;
    key: string;
    status: ETransactionStatus;
    type: EProductTransactionType;
}

export interface ICreateProductTransaction {
    user: string;
    product: string;
    description: string;
    key?: string;
    type: EProductTransactionType;
}

export interface IConfirmProductTransaction {
    id: string;
    status: ETransactionStatus;
    key: string;
}

export interface IDBProductTransaction {
    _id: string;
    id: string;
    user: string;
    product: string;
    description: string;
    date: string;
    key: string;
    status: ETransactionStatus;
    type: EProductTransactionType;
}

export interface IAccessKey {
    _id: string;
    key: string;
    value: string;
}

export type IDBAccessKey = IAccessKey;
export type ICreateAccessKey = Omit<IAccessKey, "_id">;

export type UnCertainData<T> = T | undefined | null;
