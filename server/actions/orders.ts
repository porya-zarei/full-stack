import {IAPIResult} from "@/types/api";
import {
    EStatus,
    IOrder,
    IUser,
    IDBOrder,
    ICreateOrder,
    ERole,
    ESTATUS_NAMES,
} from "@/types/data";
import {Types} from "mongoose";
import {
    createOrderMDB,
    deleteOrderMDB,
    getGroupMDB,
    getOrderMDB,
    getOrdersMDB,
    getUserByRoleMDB,
    getUserMDB,
    updateOrderMDB,
} from "../mongoose/functions";
import {sendSms} from "../sms";
import {logger} from "../utils/logger";
import {isExtraPrice} from "../utils/premissions";

const sendSmsOnAddOrder = (user: IUser, supervisor: IUser, status: EStatus) => {
    sendSms(
        `سفارش شما با وضعیت ${ESTATUS_NAMES[Number(status)]} ثبت شد`,
        user.fullName,
        user.phoneNumber,
        (_, st, msg) => {
            logger.log(`sms sended, ${st}, ${msg}`);
        },
    );
    if (status === EStatus.PENDING_FOR_SUPERVISOR) {
        sendSms(
            `سفارشی برای تایید شما با وضعیت ${
                ESTATUS_NAMES[Number(status)]
            } از طرف ${user.fullName} ثبت شد.`,
            supervisor.fullName,
            supervisor.phoneNumber,
            (_, st, msg) => {
                logger.log(`sms sended, ${st}, ${msg}`);
            },
        );
    } else if (status === EStatus.PENDING_FOR_FINANCIAL_MANAGER) {
        getUserByRoleMDB(ERole.CREATOR)
            .then((creator) => {
                if (creator) {
                    sendSms(
                        `سفارشی برای تایید شما با وضعیت ${
                            ESTATUS_NAMES[Number(status)]
                        } از طرف ${user.fullName} ثبت شد.`,
                        creator.fullName,
                        creator.phoneNumber,
                        (_, st, msg) => {
                            logger.log(`sms sended, ${st}, ${msg}`);
                        },
                    );
                }
            })
            .catch((error) => {
                logger.log(`error in send sms to creator => ${error}`);
            });
    }
};

const sendSmsOnUpdateOrder = (user: IUser, status: EStatus) => {
    logger.log("in send sms");
    sendSms(
        `سفارش شما با وضعیت ${ESTATUS_NAMES[Number(status)]} اپدیت شد`,
        user.fullName,
        user.phoneNumber,
        (_, st, msg) => {
            logger.log(`sms sended, ${st}, ${msg}`);
        },
    );
    getUserByRoleMDB(ERole.CREATOR)
        .then((creator) => {
            if (creator) {
                sendSms(
                    `سفارشی برای تایید شما با وضعیت ${
                        ESTATUS_NAMES[Number(status)]
                    } از طرف ${user.fullName} وجود دارد.`,
                    creator.fullName,
                    creator.phoneNumber,
                    (_, st, msg) => {
                        logger.log(`sms sended, ${st}, ${msg}`);
                    },
                );
            }
        })
        .catch((error) => {
            logger.log(`error in send sms to creator => ${error}`);
        });
};

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
        user.password = "";
        supervisor.password = "";
        return {user, supervisor};
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
                    ...order,
                    user,
                    supervisor,
                });
        }
    }
    logger.log(`get all orders => ${JSON.stringify(newOrders[0])}`);
    const result: IAPIResult<IOrder[]> = {
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
                ...order,
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

const getAddOrderStatus = (user: IUser, supervisor: IUser) => {
    return user.role === ERole.USER
        ? EStatus.PENDING_FOR_SUPERVISOR
        : supervisor.group.id === user.group.id
        ? EStatus.PENDING_FOR_FINANCIAL_MANAGER
        : EStatus.PENDING_FOR_SUPERVISOR;
};

export const addOrder = async (createOrder: ICreateOrder) => {
    const {user, supervisor} = await getUserAndSupervisor(createOrder);
    const orders = await getAllOrders();
    if (user && supervisor && orders) {
        const id = new Types.ObjectId().toString();
        const group = user.group;
        const isExtra = isExtraPrice(orders.data, createOrder, group);
        const status = getAddOrderStatus(user, supervisor);
        const order: IDBOrder = {
            ...createOrder,
            status,
            date: new Date().toISOString(),
            id: id,
            _id: id,
            isExtra,
            description:
                createOrder.description.length > 0
                    ? createOrder.description
                    : "بدون توضیحات",
        };
        const createdOrder = await createOrderMDB(order);
        if (createdOrder) {
            const newOrder: IOrder = {
                ...createdOrder,
                user,
                supervisor,
            };
            const result: IAPIResult<Partial<IOrder>> = {
                data: newOrder,
                ok: true,
                error: "",
            };
            sendSmsOnAddOrder(user, supervisor, status);
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

export const updateOrder = async (id: string, order: Partial<IDBOrder>) => {
    logger.log("in update order");
    const updatedOrder = await updateOrderMDB(id, order);
    if (updatedOrder) {
        const {user, supervisor} = await getUserAndSupervisor(updatedOrder);
        if (user && supervisor && updatedOrder) {
            logger.log("before send sms");
            sendSmsOnUpdateOrder(user, updatedOrder.status);
            const newOrder: IOrder = {
                ...updatedOrder,
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
                    ...order,
                    user,
                    supervisor,
                });
            }
        }
    }
    const result: IAPIResult<Partial<IOrder>[]> = {
        data: fullOrders
            .filter((order) => {
                logger.log(
                    `order status: ${order.status},user role: ${user?.role}`,
                );
                if (user?.role === ERole.CREATOR) {
                    return true;
                } else if (user?.role === ERole.ADMIN) {
                    return order.status === EStatus.PENDING_FOR_SUPERVISOR;
                } else {
                    return false;
                }
            })
            .filter((order) => {
                if (user?.role === ERole.ADMIN) {
                    return (
                        String(order.user?.group.id) === String(user?.group.id)
                    );
                } else if (user?.role === ERole.CREATOR) {
                    return true;
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
                    ...order,
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

export const changeOrderStatus = async (
    id: string = "",
    status: EStatus,
    responseText: string = "",
) => {
    const order = await getOrderMDB(id);
    if (order) {
        const updates: Partial<IDBOrder> = {status};
        if (responseText && responseText?.length > 0) {
            updates["responseText"] = responseText;
        }
        const updatedOrder = await updateOrderMDB(id, {...updates});
        const {user, supervisor} = await getUserAndSupervisor(order);
        if (user && supervisor && updatedOrder) {
            sendSmsOnUpdateOrder(user, status);
            const newOrder: Partial<IOrder> = {
                ...updatedOrder,
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

export const checkMoneyLimit = async (groupId: string, money: string) => {
    const group = await getGroupMDB(groupId);
    const orders = await getAllOrders();
    if (group && orders) {
        if (!isExtraPrice(orders.data, Number(money), group)) {
            const result: IAPIResult<boolean> = {
                data: true,
                ok: true,
                error: "",
            };
            return result;
        } else {
            const result: IAPIResult<boolean> = {
                data: false,
                ok: true,
                error: "you have exceeded the money limit",
            };
            return result;
        }
    }
    return {
        data: false,
        ok: false,
        error: "group not found",
    };
};
