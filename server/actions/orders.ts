import {IAPIResult} from "@/types/api";
import {
    EStatus,
    IOrder,
    IUser,
    IDBOrder,
    ICreateOrder,
    ERole,
} from "@/types/data";
import {Types} from "mongoose";
import {
    createOrderMDB,
    deleteOrderMDB,
    getOrderMDB,
    getOrdersMDB,
    getUserMDB,
    updateOrderMDB,
} from "../mongoose/functions";
import {logger} from "../utils/logger";

export const getUserAndSupervisor = async (
    data:
        | IDBOrder
        | {
              user: string;
              supervisor: string;
          },
) => {
    const user = await getUserMDB(data.user);
    const supervisor = await getUserMDB(data.supervisor);
    if (user && supervisor) {
        return {user: user.toObject(), supervisor: supervisor.toObject()};
    }
    return {user: null, supervisor: null};
};

export const getAllOrders = async () => {
    const orders = await getOrdersMDB();

    const newOrders: IOrder[] = [];
    if (orders) {
        for (const order of orders) {
            const {user, supervisor} = await getUserAndSupervisor(order);
            user &&
                supervisor &&
                newOrders.push({
                    ...order.toObject(),
                    user,
                    supervisor,
                });
        }
    }
    logger.log(`get all orders => ${JSON.stringify(newOrders[0])}`);
    const result: IAPIResult<Partial<IOrder>[]> = {
        data: newOrders,
        ok: newOrders.length > 0,
        error: "",
    };
    return result;
};

export const getOrder = async (id: string = "") => {
    const order = await getOrderMDB(id);
    if (order) {
        const {user, supervisor} = await getUserAndSupervisor(order);
        if (user && supervisor) {
            const newOrder: IOrder = {
                ...order.toObject(),
                user,
                supervisor,
            };
            const result: IAPIResult<IOrder> = {
                data: newOrder,
                ok: !!newOrder,
                error: "",
            };
            return result;
        }
    }
    const result: IAPIResult<IOrder | null> = {
        data: null,
        ok: false,
        error: "Order not found",
    };
    return result;
};

export const addOrder = async (createOrder: ICreateOrder) => {
    const {user, supervisor} = await getUserAndSupervisor(createOrder);
    if (user && supervisor) {
        const id = new Types.ObjectId().toString();
        const order: IDBOrder = {
            ...createOrder,
            status:
                user.role === ERole.USER
                    ? EStatus.PENDING_FOR_SUPERVISOR
                    : EStatus.PENDING_FOR_FINANCIAL_MANAGER,
            date: new Date().toISOString(),
            id: id,
            _id: id,
        };
        const createdOrder = await createOrderMDB(order);
        if (createdOrder) {
            const newOrder: IOrder = {
                ...createdOrder.toObject(),
                user,
                supervisor,
            };
            const result: IAPIResult<Partial<IOrder>> = {
                data: newOrder,
                ok: true,
                error: "",
            };
            return result;
        }
    }
    const result: IAPIResult<IOrder | null> = {
        data: null,
        ok: false,
        error: "Order not created",
    };
    return result;
};

export const updateOrder = async (order: IDBOrder) => {
    const updatedOrder = await updateOrderMDB(order.id, order);
    const {user, supervisor} = await getUserAndSupervisor(order);
    if (user && supervisor && updatedOrder) {
        const newOrder: IOrder = {
            ...updatedOrder.toObject(),
            user,
            supervisor,
        };
        const result: IAPIResult<Partial<IOrder>> = {
            data: newOrder,
            ok: true,
            error: "",
        };
        return result;
    }
    const result: IAPIResult<IOrder | null> = {
        data: null,
        ok: false,
        error: "Order not updated",
    };
    return result;
};

export const deleteOrder = async (id: string = "") => {
    await deleteOrderMDB(id);
    const result: IAPIResult<string> = {
        data: "deleted",
        ok: true,
        error: "deleted",
    };
    return result;
};

export const getPendingOrders = async (id: string = "") => {
    const user = await getUserMDB(id);
    const orders = await getOrdersMDB();
    logger.log(`orders count: ${orders?.length},user name: ${user?.fullName}`);
    const fullOrders: IOrder[] = [];
    if (orders) {
        for (const order of orders) {
            const {user, supervisor} = await getUserAndSupervisor(order);
            if (user && supervisor) {
                fullOrders.push({
                    ...order.toObject(),
                    user,
                    supervisor,
                });
            }
        }
    }
    const result: IAPIResult<Partial<IOrder>[]> = {
        data: fullOrders
            .filter(
                (order) => Number(order.user?.group) === Number(user?.group),
            )
            .filter((order) => {
                logger.log(
                    `order status: ${order.status},user role: ${user?.role}`,
                );
                if (user?.role === ERole.CREATOR) {
                    return (
                        order.status === EStatus.PENDING_FOR_FINANCIAL_MANAGER
                    );
                } else if (user?.role === ERole.ADMIN) {
                    return order.status === EStatus.PENDING_FOR_SUPERVISOR;
                } else {
                    return false;
                }
            }),
        ok: true,
        error: "",
    };
    return result;
};

export const getUserOrders = async (id: string = "") => {
    const user = await getUserMDB(id);
    const orders = await getOrdersMDB();
    const filtered = orders?.filter((order) => {
        return order?.user === user?.id;
    });
    const data: IOrder[] = [];
    if (filtered) {
        for (const order of filtered) {
            const {user, supervisor} = await getUserAndSupervisor(order);
            if (user && supervisor) {
                data.push({
                    ...order.toObject(),
                    user,
                    supervisor,
                });
            }
        }
    }
    const result: IAPIResult<Partial<IOrder>[]> = {
        data: data,
        ok: true,
        error: "",
    };
    return result;
};

export const changeOrderStatus = async (id: string = "", status: EStatus) => {
    const order = await getOrderMDB(id);
    if (order) {
        order.status = status;
        updateOrderMDB(id, order);
        const {user, supervisor} = await getUserAndSupervisor(order);
        if (user && supervisor) {
            const newOrder: Partial<IOrder> = {
                ...order.toObject(),
                user,
                supervisor,
            };
            const result: IAPIResult<Partial<IOrder>> = {
                data: newOrder,
                ok: true,
                error: "",
            };
            return result;
        }
    }
    const result: IAPIResult<IOrder | null> = {
        data: null,
        ok: false,
        error: "Order not found",
    };
    return result;
};
