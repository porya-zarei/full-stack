import {IAPIResult} from "@/types/api";
import {EStatus, IOrder, IUser, IDBOrder, IProduct} from "@/types/data";
import {
    addToJsonFile,
    deleteFromJsonFile,
    getAllFromJsonFile,
    getFromJsonFile,
    updateInJsonFile,
} from "../utils/json-database";
import {logger} from "../utils/logger";

export const getUserAndSupervisor = (order: IDBOrder) => {
    const user = getFromJsonFile<IUser>("../local-db/users.json", order.user);
    const supervisor = getFromJsonFile<IUser>(
        "../local-db/users.json",
        order.supervisor,
    );
    return {user, supervisor};
};

export const getAllOrders = async () => {
    const orders = getAllFromJsonFile<IDBOrder>("../local-db/orders.json");
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
    const order = getFromJsonFile<IDBOrder>("../local-db/orders.json", id);
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
    addToJsonFile("../local-db/orders.json", order);
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
    updateInJsonFile("../local-db/orders.json", order, order.id);
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
    deleteFromJsonFile("../local-db/orders.json", id);
    const result: IAPIResult<string> = {
        data: "ok",
        ok: true,
        error: "",
    };
    return result;
};

export const getPendingOrders = async (id: string) => {
    const user = getFromJsonFile<IUser>("../local-db/users.json", id);
    const orders = getAllFromJsonFile<IDBOrder>("../local-db/orders.json");
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
    const user = getFromJsonFile<IUser>("../local-db/users.json", id);
    const orders = getAllFromJsonFile<IDBOrder>("../local-db/orders.json");
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
