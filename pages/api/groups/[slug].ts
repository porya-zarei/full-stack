import {NextApiHandler} from "next";

import {IAPIResult} from "@/types/api";
import {
    addGroupHandler,
    deleteGroupHandler,
    deleteGroupLimitYearHandler,
    getAllGroupsHandler,
    getGroupHandler,
    updateGroupHandler,
} from "@/server/controllers/groups";

const HANDLERS: Record<string, NextApiHandler> = {
    addGroup: addGroupHandler,
    deleteGroup: deleteGroupHandler,
    getAllGroups: getAllGroupsHandler,
    getGroup: getGroupHandler,
    updateGroup: updateGroupHandler,
    deleteGroupLimitYear: deleteGroupLimitYearHandler,
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
