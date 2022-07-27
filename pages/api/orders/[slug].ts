import {NextApiHandler} from "next";
import {
    addOrderHandler,
    deleteOrderHandler,
    getAllOrdersHandler,
    getOrderHandler,
    getPendingOrdersHandler,
    updateOrderHandler,
} from "@/server/controllers/orders";

const HANDLERS: Record<string, NextApiHandler> = {
    addOrder: addOrderHandler,
    deleteOrder: deleteOrderHandler,
    getAllOrders: getAllOrdersHandler,
    getOrder: getOrderHandler,
    getPendingOrders: getPendingOrdersHandler,
    updateOrder: updateOrderHandler,
};

const handler: NextApiHandler = (req, res) => {
    const {slug} = req.query;
    if (typeof slug === "string" && slug in HANDLERS) {
        HANDLERS[slug](req, res);
    }
};

export default handler;
