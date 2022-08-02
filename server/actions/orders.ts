import {IAPIResult} from "@/types/api";
import {
    EStatus,
    IOrder,
    IUser,
    IDBOrder,
    ICreateOrder,
    ERole,
} from "@/types/data";
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
import {logger} from "../utils/logger";
import {uuidGenerator} from "../utils/uuid-helper";

export const getUserAndSupervisor = (
    data:
        | IDBOrder
        | {
              user: string;
              supervisor: string;
          },
) => {
    const user = getFromJsonFile<IUser>(USERS_JSON_DB_FILE, data.user);
    const supervisor = getFromJsonFile<IUser>(
        USERS_JSON_DB_FILE,
        data.supervisor,
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

export const getOrder = async (id: string = "") => {
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

export const addOrder = async (createOrder: ICreateOrder) => {
    const {user, supervisor} = getUserAndSupervisor(createOrder);
    const order: IDBOrder = {
        ...createOrder,
        status:
            user.role === ERole.USER
                ? EStatus.PENDING_FOR_SUPERVISOR
                : EStatus.PENDING_FOR_FINANCIAL_MANAGER,
        date: new Date().toISOString(),
        id: uuidGenerator(),
    };
    addToJsonFile(ORDERS_JSON_DB_FILE, order);
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

export const deleteOrder = async (id: string = "") => {
    deleteFromJsonFile(ORDERS_JSON_DB_FILE, id);
    const result: IAPIResult<string> = {
        data: "ok",
        ok: true,
        error: "",
    };
    return result;
};

export const getPendingOrders = async (id: string = "") => {
    const user = getFromJsonFile<IUser>(USERS_JSON_DB_FILE, id);
    const orders = getAllFromJsonFile<IDBOrder>(ORDERS_JSON_DB_FILE);
    logger.log(`orders count: ${orders.length},user name: ${user.fullName}`);
    const fullOrders = orders.map((order) => {
        const {user, supervisor} = getUserAndSupervisor(order);
        const newOrder: Partial<IOrder> = {
            ...order,
            user,
            supervisor,
        };
        return newOrder;
    });
    const result: IAPIResult<Partial<IOrder>[]> = {
        data: fullOrders
            .filter(
                (order) => Number(order.user?.group) === Number(user?.group),
            )
            .filter((order) => {
                logger.log(
                    `order status: ${order.status},user role: ${user.role}`,
                );
                if (user.role === ERole.CREATOR) {
                    return (
                        order.status === EStatus.PENDING_FOR_FINANCIAL_MANAGER
                    );
                } else if (user.role === ERole.ADMIN) {
                    return order.status === EStatus.PENDING_FOR_SUPERVISOR;
                } else {
                    return false;
                }
            })
            .map((order) => {
                const {user, supervisor} = getUserAndSupervisor({
                    user: order.user?.id ?? "",
                    supervisor: order.supervisor?.id ?? "",
                });
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

export const getUserOrders = async (id: string = "") => {
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

export const changeOrderStatus = async (id: string = "", status: EStatus) => {
    const order = getFromJsonFile<IDBOrder>(ORDERS_JSON_DB_FILE, id);
    order.status = status;
    updateInJsonFile(ORDERS_JSON_DB_FILE, order, id);
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
