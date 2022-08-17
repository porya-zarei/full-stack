import {IAPIResult} from "@/types/api";
import {ICreateGroup, IUser} from "@/types/data";
import {NextApiHandler} from "next";
import {
    createGroup,
    deleteGroup,
    deleteGroupLimitYear,
    getAllGroups,
    getGroup,
    updateGroup,
} from "../actions/groups";
import {getTokenFromRequest, getUserFromToken} from "../utils/jwt-helper";
import {logger} from "../utils/logger";

export const getAllGroupsHandler: NextApiHandler = async (req, res) => {
    try {
        logger.log("in getAllGroupsHandler");
        const result = await getAllGroups();
        res.status(200).json(result);
    } catch (error) {
        logger.error(error);
        const result: IAPIResult<IUser | null> = {
            data: null,
            ok: false,
            error: "Error getting all groups",
        };
        res.status(500).json(result);
    }
};

export const getGroupHandler: NextApiHandler = async (req, res) => {
    try {
        const {id} = req.query as {id: string};
        const result = await getGroup(id);
        res.status(200).json(result);
    } catch (error) {
        logger.error(error);
        const result: IAPIResult<IUser | null> = {
            data: null,
            ok: false,
            error: "Error getting group",
        };
        res.status(500).json(result);
    }
};

export const addGroupHandler: NextApiHandler = async (req, res) => {
    try {
        const token = getTokenFromRequest(req);
        if (token) {
            const user = await getUserFromToken(token);
            if (user) {
                const data = req.body as ICreateGroup;
                logger.log("createGroupHandle : " + JSON.stringify(data));
                const result = await createGroup(data);
                res.status(200).json(result);
            } else {
                const result: IAPIResult<IUser | null> = {
                    data: null,
                    ok: false,
                    error: "UnAuthorized",
                };
                res.status(401).json(result);
            }
        } else {
            const result: IAPIResult<string> = {
                data: "",
                ok: false,
                error: "UnAuthorized",
            };
            res.status(401).json(result);
        }
    } catch (error) {
        logger.error(error);
        const result: IAPIResult<IUser | null> = {
            data: null,
            ok: false,
            error: "Error adding group",
        };
        res.status(500).json(result);
    }
};

export const deleteGroupHandler: NextApiHandler = async (req, res) => {
    try {
        const token = getTokenFromRequest(req);
        if (token) {
            const user = await getUserFromToken(token);
            if (user) {
                const {id} = req.body as {id: string};
                const result = await deleteGroup(id);
                res.status(200).json(result);
            } else {
                const result: IAPIResult<string> = {
                    data: "",
                    ok: false,
                    error: "UnAuthorized",
                };
                res.status(401).json(result);
            }
        } else {
            const result: IAPIResult<string> = {
                data: "",
                ok: false,
                error: "UnAuthorized",
            };
            res.status(401).json(result);
        }
    } catch (error) {
        logger.error(error);
        const result: IAPIResult<IUser | null> = {
            data: null,
            ok: false,
            error: "Error deleting group",
        };
        res.status(500).json(result);
    }
};

export const deleteGroupLimitYearHandler: NextApiHandler = async (req, res) => {
    try {
        const token = getTokenFromRequest(req);
        if (token) {
            const user = await getUserFromToken(token);
            if (user) {
                const {groupId, yearLimitId} = req.body as {
                    groupId: string;
                    yearLimitId: string;
                };
                const result = await deleteGroupLimitYear(groupId, yearLimitId);
                res.status(200).json(result);
            } else {
                const result: IAPIResult<string> = {
                    data: "",
                    ok: false,
                    error: "UnAuthorized",
                };
                res.status(401).json(result);
            }
        } else {
            const result: IAPIResult<string> = {
                data: "",
                ok: false,
                error: "UnAuthorized",
            };
            res.status(401).json(result);
        }
    } catch (error) {
        logger.error(error);
        const result: IAPIResult<IUser | null> = {
            data: null,
            ok: false,
            error: "Error deleting group",
        };
        res.status(500).json(result);
    }
};

export const updateGroupHandler: NextApiHandler = async (req, res) => {
    try {
        const token = getTokenFromRequest(req);
        if (token) {
            const user = await getUserFromToken(token);
            if (user) {
                const data = req.body as ICreateGroup & {id: string};
                logger.log(`data in update group =>     ${JSON.stringify(data)}`);
                const result = await updateGroup({...data, id: data.id});
                res.status(200).json(result);
            } else {
                const result: IAPIResult<string> = {
                    data: "",
                    ok: false,
                    error: "UnAuthorized",
                };
                res.status(401).json(result);
            }
        } else {
            const result: IAPIResult<string> = {
                data: "",
                ok: false,
                error: "UnAuthorized",
            };
            res.status(401).json(result);
        }
    } catch (error) {
        logger.error(error);
        const result: IAPIResult<IUser | null> = {
            data: null,
            ok: false,
            error: "Error updating group",
        };
        res.status(500).json(result);
    }
};
