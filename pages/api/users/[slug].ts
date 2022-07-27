import {NextApiHandler} from "next";
import {
    addUserHandler,
    deleteUserHandler,
    getAllUsersHandler,
    getUserHandler,
    updateUserHandler,
    loginUserHandler,
    registerUserHandler,
} from "@/server/controllers/users";

const HANDLERS: Record<string, NextApiHandler> = {
    addUser: addUserHandler,
    deleteUser: deleteUserHandler,
    getAllUsers: getAllUsersHandler,
    getUser: getUserHandler,
    updateUser: updateUserHandler,
    loginUser: loginUserHandler,
    registerUser: registerUserHandler,
};

const handler: NextApiHandler = (req, res) => {
    const {slug} = req.query;
    if (typeof slug === "string" && slug in HANDLERS) {
        HANDLERS[slug](req, res);
    }
};

export default handler;
