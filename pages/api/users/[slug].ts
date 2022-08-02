import {NextApiHandler} from "next";
import {
    addUserHandler,
    deleteUserHandler,
    getAllUsersHandler,
    getUserHandler,
    updateUserHandler,
    loginUserHandler,
    registerUserHandler,
    changeUserGroupHandler,
    changeUserRoleHandler,
} from "@/server/controllers/users";
import {IAPIResult} from "@/types/api";

const HANDLERS: Record<string, NextApiHandler> = {
    addUser: addUserHandler,
    deleteUser: deleteUserHandler,
    getAllUsers: getAllUsersHandler,
    getUser: getUserHandler,
    updateUser: updateUserHandler,
    loginUser: loginUserHandler,
    registerUser: registerUserHandler,
    changeUserGroup: changeUserGroupHandler,
    changeUserRole: changeUserRoleHandler,
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
