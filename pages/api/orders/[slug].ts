import {NextApiHandler} from "next";
import {
    addOrderHandler,
    checkMoneyLimitHandler,
    deleteOrderHandler,
    getAllOrdersHandler,
    getOrderHandler,
    getPendingOrdersHandler,
    getUserOrdersHandler,
    updateOrderHandler,
    updateOrderStatusHandler,
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
    updateOrderStatus: updateOrderStatusHandler,
    checkMoneyLimit: checkMoneyLimitHandler,
};

const handler: NextApiHandler = async (req, res) => {
    const {slug} = req.query;
    console.log("slug => ",slug);
    console.log("body => ",req.body);
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
