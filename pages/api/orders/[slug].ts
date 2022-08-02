import {NextApiHandler} from "next";
import {
    addOrderHandler,
    deleteOrderHandler,
    getAllOrdersHandler,
    getOrderHandler,
    getPendingOrdersHandler,
    getUserOrdersHandler,
    updateOrderHandler,
} from "@/server/controllers/orders";
import {IAPIResult} from "@/types/api";

const HANDLERS: Record<string, NextApiHandler> = {
    addOrder: addOrderHandler,
    deleteOrder: deleteOrderHandler,
    getAllOrders: getAllOrdersHandler,
    getOrder: getOrderHandler,
    getPendingOrders: getPendingOrdersHandler,
    updateOrder: updateOrderHandler,
    userOrders: getUserOrdersHandler,
};

const handler: NextApiHandler = async (req, res) => {
    const {slug} = req.query;
    console.log("slug => ",slug);
    if (typeof slug === "string" && slug in HANDLERS) {
        await HANDLERS[slug](req, res);
    } else {
        const result: IAPIResult<string> = {
            data: "",
            ok: false,
            error: "Invalid slug",
        };
        res.status(404).json(result);
    }
};

export default handler;
