import {IAPIResult} from "@/types/api";
import {EStatus, IOrder, IUser, IDBOrder, ERole} from "@/types/data";
import {NextApiHandler} from "next";
import {
    addOrder,
    changeOrderStatus,
    deleteOrder,
    getAllOrders,
    getOrder,
    getPendingOrders,
    getUserOrders,
    updateOrder,
} from "../actions/orders";
import {getTokenFromRequest, getUserFromToken} from "../utils/jwt-helper";
import {logger} from "../utils/logger";

export const getAllOrdersHandler: NextApiHandler = async (req, res) => {
    try {
        const token = getTokenFromRequest(req);
        if (token) {
            const result = await getAllOrders();
            res.status(200).json(result);
        } else {
            const result: IAPIResult<string> = {
                data: "",
                ok: false,
                error: "Unauthorized",
            };
            res.status(401).json(result);
        }
    } catch (error) {
        logger.error(error);
        const result: IAPIResult<string> = {
            data: "",
            ok: false,
            error: "Error getting orders",
        };
        res.status(500).json(result);
    }
};

export const getOrderHandler: NextApiHandler = async (req, res) => {
    try {
        const token = getTokenFromRequest(req);
        if (token) {
            const {id} = req.body as {id: string};
            const result = await getOrder(id);
            res.status(200).json(result);
        } else {
            const result: IAPIResult<string> = {
                data: "",
                ok: false,
                error: "Unauthorized",
            };
            res.status(401).json(result);
        }
    } catch (error) {
        logger.error(error);
        const result: IAPIResult<IOrder | null> = {
            data: null,
            ok: false,
            error: "Order not found",
        };
        res.status(400).json(result);
    }
};

export const addOrderHandler: NextApiHandler = async (req, res) => {
    try {
        const token = getTokenFromRequest(req);
        if (token) {
            const order = req.body as IDBOrder;
            const result = await addOrder(order);
            res.status(200).json(result);
        } else {
            const result: IAPIResult<string> = {
                data: "",
                ok: false,
                error: "Unauthorized",
            };
            res.status(401).json(result);
        }
    } catch (error) {
        logger.error(error);
        const result: IAPIResult<string> = {
            data: "",
            ok: false,
            error: "Error adding order",
        };
        res.status(500).json(result);
    }
};

export const updateOrderHandler: NextApiHandler = async (req, res) => {
    try {
        const token = getTokenFromRequest(req);
        if (token) {
            const order = req.body as IDBOrder;
            const result = await updateOrder(order);
            res.status(200).json(result);
        } else {
            const result: IAPIResult<string> = {
                data: "",
                ok: false,
                error: "Unauthorized",
            };
            res.status(401).json(result);
        }
    } catch (error) {
        logger.error(error);
        const result: IAPIResult<string> = {
            data: "",
            ok: false,
            error: "Error updating order",
        };
        res.status(500).json(result);
    }
};

export const deleteOrderHandler: NextApiHandler = async (req, res) => {
    try {
        const token = getTokenFromRequest(req);
        if (token) {
            const {id} = req.body as {id: string};
            const result = await deleteOrder(id);
            res.status(200).json(result);
        } else {
            const result: IAPIResult<string> = {
                data: "",
                ok: false,
                error: "Unauthorized",
            };
            res.status(401).json(result);
        }
    } catch (error) {
        logger.error(error);
        const result: IAPIResult<string> = {
            data: "",
            ok: false,
            error: "Error deleting order",
        };
        res.status(500).json(result);
    }
};

export const getPendingOrdersHandler: NextApiHandler = async (req, res) => {
    try {
        const token = getTokenFromRequest(req);
        if (token) {
            const {id: userId} = req.body as {id: string};
            const result = await getPendingOrders(userId);
            logger.log(`Pending orders: ${result.ok} for user ${userId}`);
            logger.log(`${result.data.length}`);
            res.status(200).json(result);
        } else {
            const result: IAPIResult<string> = {
                data: "",
                ok: false,
                error: "Unauthorized",
            };
            res.status(401).json(result);
        }
    } catch (error) {
        logger.error(error);
        const result: IAPIResult<string> = {
            data: "",
            ok: false,
            error: "Error getting pending orders",
        };
        res.status(500).json(result);
    }
};

export const getUserOrdersHandler: NextApiHandler = async (req, res) => {
    try {
        const token = getTokenFromRequest(req);
        if (token) {
            const userId = req.query.id?.toString() ?? "";
            logger.log(`Getting orders for user ${userId}`);
            const result = await getUserOrders(userId);
            res.status(200).json(result);
        } else {
            const result: IAPIResult<string> = {
                data: "",
                ok: false,
                error: "Unauthorized",
            };
            res.status(401).json(result);
        }
    } catch (error) {
        logger.error(error);
        const result: IAPIResult<string> = {
            data: "",
            ok: false,
            error: "Error getting user orders",
        };
        res.status(500).json(result);
    }
};

export const updateOrderStatusHandler: NextApiHandler = async (req, res) => {
    try {
        const token = getTokenFromRequest(req);
        if (token) {
            const {id, confirmed} = req.body as {
                id: string;
                confirmed: boolean;
            };
            const order = await getOrder(id);
            const user = await getUserFromToken(token);
            let status = EStatus.PENDING_FOR_SUPERVISOR;
            if (confirmed) {
                if (
                    order.data.status === EStatus.PENDING_FOR_SUPERVISOR &&
                    user?.role === ERole.ADMIN
                ) {
                    status = EStatus.PENDING_FOR_FINANCIAL_MANAGER;
                } else if (
                    order.data.status ===
                        EStatus.PENDING_FOR_FINANCIAL_MANAGER &&
                    user?.role === ERole.CREATOR
                ) {
                    status = EStatus.PENDING_FOR_PAYMENT;
                } else if (
                    order.data.status === EStatus.PENDING_FOR_PAYMENT &&
                    user?.role === ERole.CREATOR
                ) {
                    status = EStatus.COMPLETED;
                }
            } else {
                status = EStatus.REJECTED;
            }
            const result = await changeOrderStatus(id, status);
            res.status(200).json(result);
        } else {
            const result: IAPIResult<string> = {
                data: "",
                ok: false,
                error: "Error updating order status",
            };
            res.status(500).json(result);
        }
    } catch (error) {
        logger.error(error);
        const result: IAPIResult<string> = {
            data: "",
            ok: false,
            error: "Error updating order",
        };
        res.status(500).json(result);
    }
};
