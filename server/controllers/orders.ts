import {IAPIResult} from "@/types/api";
import {EStatus, IOrder, IUser, IDBOrder} from "@/types/data";
import {NextApiHandler} from "next";
import {
    addOrder,
    deleteOrder,
    getAllOrders,
    getOrder,
    getPendingOrders,
    getUserOrders,
    updateOrder,
} from "../actions/orders";
import {logger} from "../utils/logger";

export const getAllOrdersHandler: NextApiHandler = async (req, res) => {
    try {
        const result = await getAllOrders();
        res.status(200).json(result);
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
        const id = req.query.id?.toString() ?? "";
        const result = await getOrder(id);
        res.status(200).json(result);
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
        const order = req.body as IDBOrder;
        const result = await addOrder(order);
        res.status(200).json(result);
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
        const order = req.body as IDBOrder;
        const result = await updateOrder(order);
        res.status(200).json(result);
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
        const id = req.query.id?.toString() ?? "";
        const result = await deleteOrder(id);
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
        const userId = req.query.id?.toString() ?? "";
        const result = await getPendingOrders(userId);
        res.status(200).json(result);
    } catch (error) {
        logger.error(error);
        const result: IAPIResult<string> = {
            data: "",
            ok: false,
            error: "Error getting not confirmed orders",
        };
        res.status(500).json(result);
    }
};

export const getUserOrdersHandler: NextApiHandler = async (req, res) => {
    try {
        const userId = req.query.id?.toString() ?? "";
        const result = await getUserOrders(userId);
        res.status(200).json(result);
    } catch (error) {
        logger.error(error);
        const result: IAPIResult<string> = {
            data: "",
            ok: false,
            error: "Error getting user orders",
        };
        res.status(500).json(result);
    }
}