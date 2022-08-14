import {User} from "@/prisma/generated-client";
import prismaClient from "@/prisma/prisma-client";
import {EGroup, EStatus, IOrder, IUser} from "@/types/data";
import {logger} from "./logger";

export type MDB_COLLECTIONS = "user" | "order" | "product";

export const MapObjectToObject = <
    T extends object & Record<string, any>,
    U extends object & Record<string, any>,
>(
    object1: T,
    object2: U,
) => {
    const result = {} as Record<string, any>;
    for (const key in object1) {
        if (object1.hasOwnProperty(key) && object2.hasOwnProperty(key)) {
            result[key] = object2[key];
        }
    }
    return result as T;
};

type ENUMS = EGroup | EStatus | ERole;

export const getEnumNumber = <T extends ENUMS>(
    enumObject: T,
    enumValue: string,
) => {
    let result = 0;
    for (const key in enumObject) {
        if (enumObject?.[key] === enumValue) {
            result = Number(key);
        }
    }
    return result;
};

export const getCollection = (collection: MDB_COLLECTIONS) => {
    try {
        switch (collection) {
            case "user":
                return prismaClient.user;
            case "order":
                return prismaClient.order;
            case "product":
                return prismaClient.product;
            default:
                return prismaClient.user;
        }
    } catch (error) {
        logger.error(error);
        return null;
    }
};

export const getAllFromCollection = async (collectionName: MDB_COLLECTIONS) => {
    let collection = getCollection(collectionName);
    if (collection) {
        const result = await collection?.findMany();
        return result;
    }
    return null;
};

export const getAllFromOrders = async () => {
    const collection = prismaClient.order;
    const result = await collection?.findMany();
    return result;
};

export const getAllFromUsers = async () => {
    const collection = prismaClient.user;
    const result = await collection?.findMany();
    return result;
};

export const getUserFromUsers = async (id: string) => {
    const collection = prismaClient.user;
    const result = await collection?.findUnique({where: {id}});
    return result;
};

export const getUserFromOrders = async (id: string) => {
    const collection = prismaClient.order;
    const result = await collection?.findUnique({where: {id}});
    return result;
};

export const updateUserInUsers = async (id: string, data: Partial<IUser>) => {
    const collection = prismaClient.user;
    const result = await collection.update({
        where: {id},
        data: {
            ...data,
        },
    });
    return result as IUser;
};

export const updateOrderInOrders = async (
    id: string,
    data: Partial<IOrder>,
) => {
    const collection = prismaClient.order;
    const result = await collection.update({
        where: {id},
        data: {
            ...data,
            products: {
                update: {
                    data: [...(data?.products?? [])],
                },
            },
        },
    });
    return result as IOrder;
};
