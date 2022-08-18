import {NextApiHandler} from "next";
import {IAPIResult} from "@/types/api";
import {
    addProductTransactionHandler,
    confirmProductTransactionHandler,
    deleteProductTransactionHandler,
    getAllProductTransactionsHandler,
    getProductTransactionHandler,
    getProductTransactionsByStatusHandler,
    getProductTransactionsByUserHandler,
    getProductTransactionsForConfirmationHandler,
    updateProductTransactionHandler,
} from "@/server/controllers/product-transactions";

const HANDLERS: Record<string, NextApiHandler> = {
    getAllProductTransactions: getAllProductTransactionsHandler,
    getProductTransactionsByUser: getProductTransactionsByUserHandler,
    getProductTransactionsByStatus: getProductTransactionsByStatusHandler,
    getProductTransaction: getProductTransactionHandler,
    addProductTransaction: addProductTransactionHandler,
    deleteProductTransaction: deleteProductTransactionHandler,
    updateProductTransaction: updateProductTransactionHandler,
    confirmProductTransaction: confirmProductTransactionHandler,
    getProductTransactionsForConfirmation: getProductTransactionsForConfirmationHandler,
};

const handler: NextApiHandler = async (req, res) => {
    const {slug} = req.query;
    if (typeof slug === "string" && slug in HANDLERS) {
        await HANDLERS[slug](req, res);
    } else {
        const result: IAPIResult<string> = {
            data: "",
            ok: false,
            error: "Invalid slug",
        };
        res.status(400).json(result);
    }
};

export default handler;
