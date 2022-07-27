import {IAPIResult, ILoginData} from "@/types/api";
import {IUser} from "@/types/data";
import {NextApiHandler} from "next";
import {
    addUser,
    deleteUser,
    getAllUsers,
    getUser,
    loginUser,
    registerUser,
    updateUser,
} from "../actions/users";
import {
    addToJsonFile,
    deleteFromJsonFile,
    getAllFromJsonFile,
    getFromJsonFile,
    updateInJsonFile,
} from "../utils/json-database";
import {logger} from "../utils/logger";

export const getAllUsersHandler: NextApiHandler = async (req, res) => {
    try {
        const result = getAllUsers();
        res.status(200).json(result);
    } catch (error) {
        logger.error(error);
        const result: IAPIResult<IUser[]> = {
            data: [],
            ok: false,
            error: "Error getting users",
        };
        res.status(500).json(result);
    }
};

export const getUserHandler: NextApiHandler = async (req, res) => {
    try {
        const id = req.query.id?.toString() ?? "";
        const result = getUser(id);
        res.status(200).json(result);
    } catch (error) {
        logger.error(error);
        const result: IAPIResult<IUser | null> = {
            data: null,
            ok: false,
            error: "Error getting user",
        };
        res.status(500).json(result);
    }
};

export const addUserHandler: NextApiHandler = async (req, res) => {
    try {
        const user = req.body as IUser;
        const result = addUser(user);
        res.status(200).json(result);
    } catch (error) {
        logger.error(error);
        const result: IAPIResult<IUser | null> = {
            data: null,
            ok: false,
            error: "Error adding user",
        };
        res.status(500).json(result);
    }
};

export const updateUserHandler: NextApiHandler = async (req, res) => {
    try {
        const user = req.body as IUser;
        const result = updateUser(user);
        res.status(200).json(result);
    } catch (error) {}
};

export const deleteUserHandler: NextApiHandler = async (req, res) => {
    try {
        const id = req.query.id?.toString() ?? "";
        const result = deleteUser(id);
        res.status(200).json(result);
    } catch (error) {
        logger.error(error);
        const result: IAPIResult<string> = {
            data: "",
            ok: false,
            error: "Error deleting user",
        };
        res.status(500).json(result);
    }
};

export const registerUserHandler: NextApiHandler = async (req, res) => {
    try {
        const user = req.body as IUser;
        const result = registerUser(user);
        res.status(200).json(result);
    } catch (error) {
        logger.error(error);
        const result: IAPIResult<IUser | null> = {
            data: null,
            ok: false,
            error: "Error registering user",
        };
        res.status(500).json(result);
    }
};

export const loginUserHandler: NextApiHandler = async (req, res) => {
    try {
        const user = req.body as ILoginData;
        const result = loginUser(user);
        res.status(200).json(result);
    } catch (error) {
        logger.error(error);
        const result: IAPIResult<IUser | null> = {
            data: null,
            ok: false,
            error: "Error loging user",
        };
        res.status(500).json(result);
    }
};
