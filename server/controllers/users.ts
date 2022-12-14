import {IAPIResult, ILoginData} from "@/types/api";
import {ERole, IAccessKey, ICreateUser, IDBUser, IUser} from "@/types/data";
import {NextApiHandler} from "next";
import {isAccessKeyCorrect} from "../actions/access-keys";
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
        const user = await getUserFromToken(token);
        if (user) {
            const {id} = req.body as {id: string};
            if (id?.length > 0 && user.role === ERole.CREATOR) {
                const result = await getUser(id);
                res.status(200).json(result);
            } else if (id?.length > 0 && user.role !== ERole.CREATOR) {
                const result: IAPIResult<null> = {
                    data: null,
                    error: "",
                    ok: false,
                };
                res.status(200).json(result);
            } else {
                const result: IAPIResult<IUser> = {
                    data: user,
                    error: "",
                    ok: true,
                };
                res.status(200).json(result);
            }
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
            const {user, id} = req.body as {user: Partial<IDBUser>; id: string};
            const result = await updateUser(id, user);
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
            const user = await getUserFromToken(token);
            const result = await deleteUser(id, user);
            logger.log(`deleteUserHandler: ${id}\n${JSON.stringify(result)}`);
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
export const registerUserHandler: NextApiHandler = async (req, res) => {
    try {
        const userData = req.body as ICreateUser;
        const rowAccessKey = userData.key.split("-");
        const accessKey: Omit<IAccessKey, "_id"> = {
            key: rowAccessKey?.[0] ?? "",
            value: rowAccessKey?.[1] ?? "",
        };
        const isCorrect = await isAccessKeyCorrect(accessKey);
        if (isCorrect) {
            const result = await registerUser(userData);
            if (result.data) {
                const token = getToken(result.data);
                result.token = token;
                res.setHeader("Set-Cookie", `token=${token}; Path=/`);
                res.status(200).json(result);
            } else if (result.error) {
                res.status(400).json(result);
            } else {
                res.status(500).json({
                    data: "",
                    ok: false,
                    error: "Error registering user",
                } as IAPIResult<string>);
            }
        } else {
            const result: IAPIResult<string> = {
                data: "",
                ok: false,
                error: "???????? ???????????? ???????????? ??????",
            };
            res.status(401).json(result);
        }
    } catch (error) {
        logger.error(error);
        const result: IAPIResult<IUser | null> = {
            data: null,
            ok: false,
            error: "?????? ?????? ???? ?????? ?????????? ????",
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
        } else {
            res.status(401).json({
                data: "",
                ok: false,
                error: "?????? ???????????? ???? ?????? ???????? ???????????? ??????",
            } as IAPIResult<string>);
        }
    } catch (error) {
        logger.error(error);
        const result: IAPIResult<IUser | null> = {
            data: null,
            ok: false,
            error: "?????? ???? ????????",
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
                const {id, group} = req.body as {id: string; group: string};
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
