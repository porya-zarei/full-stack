import {NextApiHandler} from "next";
import {
    getProductCategoriesHandler,
    getProductCategoryByGroupHandler,
    getProductCategoryHandler,
} from "@/server/controllers/product-categories";
import {IAPIResult} from "@/types/api";

const HANDLERS: Record<string, NextApiHandler> = {
    getProductCategories: getProductCategoriesHandler,
    getProductCategoryByGroup: getProductCategoryByGroupHandler,
    getProductCategory: getProductCategoryHandler,
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
