import {NextApiHandler} from "next";
import {IAPIResult} from "@/types/api";
import { uploadOrderFileHandler } from "@/server/controllers/uploads";
import { logger } from "@/server/utils/logger";

const HANDLERS: Record<string, NextApiHandler> = {
    uploadOrderFile: uploadOrderFileHandler,
};

const handler: NextApiHandler = async (req, res) => {
    const {slug} = req.query;
    logger.log(`slug => ${slug}`);
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

export const config = {
    api: {
        bodyParser: false,
    },
};

export default handler;
