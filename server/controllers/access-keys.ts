import {IAPIResult} from "@/types/api";
import {IAccessKey, ICreateAccessKey} from "@/types/data";
import {NextApiHandler} from "next";
import {
    addAccessKey,
    deleteAccessKey,
    getAccessKey,
    getAccessKeys,
    updateAccessKey,
} from "../actions/access-keys";
import {getTokenFromRequest, getUserFromToken} from "../utils/jwt-helper";
import {logger} from "../utils/logger";
import {isUserCanManageAccessKeys} from "../utils/premissions";

export const getAllAccessKeysHandler: NextApiHandler = async (req, res) => {
    try {
        const token = getTokenFromRequest(req);
        const user = await getUserFromToken(token);
        if (user && isUserCanManageAccessKeys(user)) {
            logger.log("in getAllAccessKeysHandler");
            const result = await getAccessKeys();
            res.status(200).json(result);
        } else {
            const result: IAPIResult<null> = {
                data: null,
                ok: false,
                error: "شما دسترسی لازم را ندارید",
            };
            res.status(401).json(result);
        }
    } catch (error) {
        logger.error(error);
        const result: IAPIResult<null> = {
            data: null,
            ok: false,
            error: "خطا در دریافت کلید های دسترسی",
        };
        res.status(500).json(result);
    }
};

export const getAccessKeyHandler: NextApiHandler = async (req, res) => {
    try {
        const token = getTokenFromRequest(req);
        const user = await getUserFromToken(token);
        if (user && isUserCanManageAccessKeys(user)) {
            logger.log("in getAccessKeyHandler");
            const {id} = req.body as {id: string};
            const result = await getAccessKey(id);
            res.status(200).json(result);
        } else {
            const result: IAPIResult<null> = {
                data: null,
                ok: false,
                error: "شما دسترسی لازم را ندارید",
            };
            res.status(401).json(result);
        }
    } catch (error) {
        logger.error(error);
        const result: IAPIResult<null> = {
            data: null,
            ok: false,
            error: "خطا در دریافت کلید دسترسی",
        };
        res.status(500).json(result);
    }
};

export const addAccessKeyHandler: NextApiHandler = async (req, res) => {
    try {
        const token = getTokenFromRequest(req);
        const user = await getUserFromToken(token);
        if (user && isUserCanManageAccessKeys(user)) {
            logger.log("in addAccessKeyHandler");
            const data = req.body as ICreateAccessKey;
            const result = await addAccessKey(data);
            res.status(200).json(result);
        } else {
            const result: IAPIResult<null> = {
                data: null,
                ok: false,
                error: "شما دسترسی لازم را ندارید",
            };
            res.status(401).json(result);
        }
    } catch (error) {
        logger.error(error);
        const result: IAPIResult<null> = {
            data: null,
            ok: false,
            error: "خطا در افزودن کلید دسترسی",
        };
        res.status(500).json(result);
    }
};

export const updateAccessKeyHandler: NextApiHandler = async (req, res) => {
    try {
        const token = getTokenFromRequest(req);
        const user = await getUserFromToken(token);
        if (user && isUserCanManageAccessKeys(user)) {
            logger.log("in updateAccessKeyHandler");
            const data = req.body as Partial<Omit<IAccessKey, "_id">> & {
                _id: string;
            };
            const result = await updateAccessKey(data);
            res.status(200).json(result);
        } else {
            const result: IAPIResult<null> = {
                data: null,
                ok: false,
                error: "شما دسترسی لازم را ندارید",
            };
            res.status(401).json(result);
        }
    } catch (error) {
        logger.error(error);
        const result: IAPIResult<null> = {
            data: null,
            ok: false,
            error: "خطا در بروزرسانی کلید دسترسی",
        };
        res.status(500).json(result);
    }
};

export const deleteAccessKeyHandler: NextApiHandler = async (req, res) => {
    try {
        const token = getTokenFromRequest(req);
        const user = await getUserFromToken(token);
        if (user && isUserCanManageAccessKeys(user)) {
            logger.log("in deleteAccessKeyHandler");
            const {id} = req.body as {
                id: string;
            };
            const result = await deleteAccessKey(id);
            res.status(200).json(result);
        } else {
            const result: IAPIResult<null> = {
                data: null,
                ok: false,
                error: "شما دسترسی لازم را ندارید",
            };
            res.status(401).json(result);
        }
    } catch (error) {
        logger.error(error);
        const result: IAPIResult<null> = {
            data: null,
            ok: false,
            error: "خطا در حذف کلید دسترسی",
        };
        res.status(500).json(result);
    }
};
