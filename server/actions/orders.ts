import {IAPIResult} from "@/types/api";
import {EStatus, IOrder, IUser, IDBOrder, IProduct} from "@/types/data";
import {
    ORDERS_JSON_DB_FILE,
    USERS_JSON_DB_FILE,
} from "../constants/json-db-files";
import {
    addToJsonFile,
    deleteFromJsonFile,
    getAllFromJsonFile,
    getFromJsonFile,
    updateInJsonFile,
} from "../utils/json-database";

export const getUserAndSupervisor = (order: IDBOrder) => {
    const user = getFromJsonFile<IUser>(USERS_JSON_DB_FILE, order.user);
    const supervisor = getFromJsonFile<IUser>(
        USERS_JSON_DB_FILE,
        order.supervisor,
    );
    return {user, supervisor};
};

export const getAllOrders = async () => {
    const orders = getAllFromJsonFile<IDBOrder>(ORDERS_JSON_DB_FILE);
    const newOrders = orders.map((order) => {
        const {user, supervisor} = getUserAndSupervisor(order);
        const newOrder: Partial<IOrder> = {
            ...order,
            user,
            supervisor,
        };
        return newOrder;
    });
    const result: IAPIResult<Partial<IOrder>[]> = {
        data: newOrders,
        ok: true,
        error: "",
    };
    return result;
};

export const getOrder = async (id: string) => {
    const order = getFromJsonFile<IDBOrder>(ORDERS_JSON_DB_FILE, id);
    const {user, supervisor} = getUserAndSupervisor(order);
    const newOrder: Partial<IOrder> = {
        ...order,
        user,
        supervisor,
    };
    const result: IAPIResult<Partial<IOrder>> = {
        data: newOrder,
        ok: true,
        error: "",
    };
    return result;
};

export const addOrder = async (order: IDBOrder) => {
    addToJsonFile(ORDERS_JSON_DB_FILE, order);
    const {user, supervisor} = getUserAndSupervisor(order);
    const newOrder: Partial<IOrder> = {
        ...order,
        user,
        supervisor,
    };
    const result: IAPIResult<Partial<IOrder>> = {
        data: newOrder,
        ok: true,
        error: "",
    };
    return result;
};

export const updateOrder = async (order: IDBOrder) => {
    updateInJsonFile(ORDERS_JSON_DB_FILE, order, order.id);
    const {user, supervisor} = getUserAndSupervisor(order);
    const newOrder: Partial<IOrder> = {
        ...order,
        user,
        supervisor,
    };
    const result: IAPIResult<Partial<IOrder>> = {
        data: newOrder,
        ok: true,
        error: "",
    };
    return result;
};

export const deleteOrder = async (id: string) => {
    deleteFromJsonFile(ORDERS_JSON_DB_FILE, id);
    const result: IAPIResult<string> = {
        data: "ok",
        ok: true,
        error: "",
    };
    return result;
};

export const getPendingOrders = async (id: string) => {
    const user = getFromJsonFile<IUser>(USERS_JSON_DB_FILE, id);
    const orders = getAllFromJsonFile<IDBOrder>(ORDERS_JSON_DB_FILE);
    const result: IAPIResult<Partial<IOrder>[]> = {
        data: orders
            .filter((order) => order.supervisor === user.id)
            .filter((order) => order.status === EStatus.PENDING)
            .map((order) => {
                const {user, supervisor} = getUserAndSupervisor(order);
                const newOrder: Partial<IOrder> = {
                    ...order,
                    user,
                    supervisor,
                };
                return newOrder;
            }),
        ok: true,
        error: "",
    };
    return result;
};

export const getUserOrders = async (id: string) => {
    const user = getFromJsonFile<IUser>(USERS_JSON_DB_FILE, id);
    const orders = getAllFromJsonFile<IDBOrder>(ORDERS_JSON_DB_FILE);
    const result: IAPIResult<Partial<IOrder>[]> = {
        data: orders
            .filter((order) => order.user === user.id)
            .map((order) => {
                const {user, supervisor} = getUserAndSupervisor(order);
                const newOrder: Partial<IOrder> = {
                    ...order,
                    user,
                    supervisor,
                };
                return newOrder;
            }),
        ok: true,
        error: "",
    };
    return result;
};