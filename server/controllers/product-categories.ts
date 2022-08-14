import { IAPIResult } from "@/types/api";
import { EGroup } from "@/types/data";
import { NextApiHandler } from "next";
import { getAllProductCategories, getProductCategoriesByGroup, getProductCategory } from "../actions/product-category";
import { getTokenFromRequest } from "../utils/jwt-helper";
import { logger } from "../utils/logger";

export const getProductCategoriesHandler:NextApiHandler = async (req, res) => {
        try {
            const token = getTokenFromRequest(req);
            if (token) {
                const result = await getAllProductCategories();
                logger.log(
                    `getAllProductCategoriesHandler: ${JSON.stringify(result.data)}`,
                );
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
                error: "Error getting product categories",
            };
            res.status(500).json(result);
        }
}

export const getProductCategoryHandler:NextApiHandler = async (req, res) => {
    try {
        const token = getTokenFromRequest(req);
        if (token) {
            const {id} = req.body as {id: string};
            logger.log(`getProductCategoryHandler id : ${id}`);
            const result = await getProductCategory(id);
            logger.log(`getProductCategoryHandler result : ${JSON.stringify(result)}`);
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
            error: "Error getting product categories",
        };
        res.status(500).json(result);
    }
}

export const getProductCategoryByGroupHandler:NextApiHandler = async (req, res) => {
    try {
        const token = getTokenFromRequest(req);
        if (token) {
            const {group} = req.body as {group: EGroup};
            logger.log(`getProductCategoryByGroupHandler group : ${group}`);
            const result = await getProductCategoriesByGroup(group);
            logger.log(`getProductCategoryByGroupHandler result : ${JSON.stringify(result)}`);
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
            error: "Error getting product categories",
        };
        res.status(500).json(result);
    }
}