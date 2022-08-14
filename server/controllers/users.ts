import {IAPIResult, ILoginData} from "@/types/api";
import {EGroup, ERole, ICreateUser, IUser} from "@/types/data";
import {NextApiHandler} from "next";
import {
    addUser,
    changeUserGroup,
    changeUserRole,
    deleteUser,
    getAllUsers,
    getUser,
    loginUser,
    registerUser,
    updateUser,
} from "../actions/users";
import {
    getToken,
    getTokenFromRequest,
    getUserFromToken,
} from "../utils/jwt-helper";
import {logger} from "../utils/logger";

export const getAllUsersHandler: NextApiHandler = async (req, res) => {
    try {
        const token = getTokenFromRequest(req);
        if (token) {
            const {id: role} = req.body as {id: string};
            const result = await getAllUsers(
                Number(role) ? (Number(role) as ERole) : null,
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
        const token = getTokenFromRequest(req);
        if (token) {
            const {id} = req.body as {id: string};
            const result = await getUser(id);
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
        const token = getTokenFromRequest(req);
        if (token) {
            const userData = req.body as ICreateUser;
            const result = await addUser(userData);
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
        const token = getTokenFromRequest(req);
        if (token) {
            const user = req.body as Partial<IUser> & {id: string};
            const result = await updateUser(user);
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
        const result: IAPIResult<IUser | null> = {
            data: null,
            ok: false,
            error: "Error updating user",
        };
        res.status(500).json(result);
    }
};

export const deleteUserHandler: NextApiHandler = async (req, res) => {
    try {
        const token = getTokenFromRequest(req);
        if (token) {
            const {id} = req.body as {id: string};
            const result = await deleteUser(id);
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
            error: "Error deleting user",
        };
        res.status(500).json(result);
    }
};
const SECRET_KEY =
    "94c2a5aaa35c259469a3d050a4d51e2df931113cf977bde8cdd377156038980c";
export const registerUserHandler: NextApiHandler = async (req, res) => {
    try {
        const userData = req.body as ICreateUser;
        if (userData.key === SECRET_KEY) {
            const result = await registerUser(userData);
            if (result.data) {
                const token = getToken(result.data);
                result.token = token;
                res.setHeader("Set-Cookie", `token=${token}; Path=/`);
                res.status(200).json(result);
            }
            res.status(500).json({
                data: "",
                ok: false,
                error: "Error registering user",
            } as IAPIResult<string>);
        } else {
            const result: IAPIResult<string> = {
                data: "",
                ok: false,
                error: "Please do not try to register",
            };
            res.status(401).json(result);
        }
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
        const loginData = req.body as ILoginData;
        logger.log("loginData => " + JSON.stringify(loginData));
        const result = await loginUser(loginData);
        logger.log("result => " + JSON.stringify(result));
        if (result.data) {
            const token = getToken(result.data);
            result.token = token;
            res.setHeader("Set-Cookie", `token=${token}; Path=/`);
            res.status(200).json(result);
        }
        res.status(401).json({
            data: "",
            ok: false,
            error: "Error logging in user",
        } as IAPIResult<string>);
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

export const changeUserGroupHandler: NextApiHandler = async (req, res) => {
    try {
        const token = getTokenFromRequest(req);
        if (token) {
            const user = await getUserFromToken(token);
            if (user) {
                const {id, group} = req.body as {id: string; group: EGroup};
                logger.log(`group to change: ${group}`);
                const result = await changeUserGroup(id, group, user);
                res.status(200).json(result);
            } else {
                const result: IAPIResult<IUser | null> = {
                    data: null,
                    ok: false,
                    error: "Error changing user role",
                };
                res.status(500).json(result);
            }
        } else {
            const result: IAPIResult<string> = {
                data: "",
                ok: false,
                error: "Error changing user group",
            };
            res.status(500).json(result);
        }
    } catch (error) {
        logger.error(error);
        const result: IAPIResult<IUser | null> = {
            data: null,
            ok: false,
            error: "Error changing user group",
        };
        res.status(500).json(result);
    }
};

export const changeUserRoleHandler: NextApiHandler = async (req, res) => {
    try {
        const token = getTokenFromRequest(req);
        if (token) {
            const user = await getUserFromToken(token);
            if (user) {
                const {id, role} = req.body as {id: string; role: ERole};
                const result = await changeUserRole(id, role, user);
                res.status(200).json(result);
            } else {
                const result: IAPIResult<IUser | null> = {
                    data: null,
                    ok: false,
                    error: "Error changing user role",
                };
                res.status(500).json(result);
            }
        } else {
            const result: IAPIResult<IUser | null> = {
                data: null,
                ok: false,
                error: "Error changing user role",
            };
            res.status(500).json(result);
        }
    } catch (error) {
        logger.error(error);
        const result: IAPIResult<IUser | null> = {
            data: null,
            ok: false,
            error: "Error changing user role",
        };
        res.status(500).json(result);
    }
};
