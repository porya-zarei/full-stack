import {IAPIResult, ILoginData} from "@/types/api";
import {EGroup, ERole, IUser} from "@/types/data";
import {
    addToJsonFile,
    deleteFromJsonFile,
    getAllFromJsonFile,
    getFromJsonFile,
    updateInJsonFile,
} from "../utils/json-database";
import {USERS_JSON_DB_FILE} from "../constants/json-db-files";
import {logger} from "../utils/logger";
import {isUserCanChangeGroup, isUserCanChangeRole} from "../utils/premissions";

export const getAllUsers = async (role?: ERole | null) => {
    const users = getAllFromJsonFile<IUser>(USERS_JSON_DB_FILE);
    const result: IAPIResult<IUser[]> = {
        data: role ? users.filter((user) => user.role === role) : users,
        ok: true,
        error: "",
    };
    logger.log(`getAllUsers: ${JSON.stringify(result)}`);
    return result;
};

export const getUser = async (id: string) => {
    const user = getFromJsonFile<IUser>(USERS_JSON_DB_FILE, id);
    const result: IAPIResult<IUser> = {
        data: user,
        ok: true,
        error: "",
    };
    return result;
};

export const addUser = async (user: IUser) => {
    addToJsonFile(USERS_JSON_DB_FILE, user);
    const result: IAPIResult<IUser> = {
        data: user,
        ok: true,
        error: "",
    };
    return result;
};

export const updateUser = async (
    userData: Partial<IUser> & {
        id: string;
    },
) => {
    const user = getFromJsonFile<IUser>(USERS_JSON_DB_FILE, userData.id);
    if (user) {
        const updatedUser = {
            ...user,
            ...userData,
        };
        updateInJsonFile(USERS_JSON_DB_FILE, updatedUser, user.id);
        const result: IAPIResult<IUser> = {
            data: user,
            ok: true,
            error: "",
        };
        return result;
    } else {
        const result: IAPIResult<IUser> = {
            data: {} as IUser,
            ok: false,
            error: "User not found",
        };
        return result;
    }
};

export const deleteUser = async (id: string) => {
    deleteFromJsonFile(USERS_JSON_DB_FILE, id);
    const result: IAPIResult<string> = {
        data: "ok",
        ok: true,
        error: "",
    };
    return result;
};

export const registerUser = async (user: IUser) => {
    addToJsonFile(USERS_JSON_DB_FILE, user);
    const result: IAPIResult<IUser> = {
        data: user,
        ok: true,
        error: "",
    };
    return result;
};

export const getUserWithUserNamePassword = (
    userName: string,
    password: string,
) => {
    const isEmail = userName.match(/^[^@]+@[^@]+\.[^@]+$/);
    const users = getAllFromJsonFile<IUser>(USERS_JSON_DB_FILE);
    if (isEmail) {
        return users.find(
            (user) => user.email === userName && user.password === password,
        );
    } else {
        return users.find(
            (user) => user.userName === userName && user.password === password,
        );
    }
};

export const loginUser = async (loginData: ILoginData) => {
    const user = getUserWithUserNamePassword(
        loginData.userName,
        loginData.password,
    );
    const result: IAPIResult<IUser | undefined> = {
        data: user,
        ok: true,
        error: "",
    };
    return result;
};

export const changeUserGroup = async (
    userId: string,
    group: EGroup,
    user: IUser | null,
) => {
    const modifiedUser = getFromJsonFile<IUser>(USERS_JSON_DB_FILE, userId);
    if (modifiedUser && user) {
        if (isUserCanChangeGroup(user, modifiedUser)) {
            const updatedUser = {
                ...modifiedUser,
                group,
            };
            updateInJsonFile(USERS_JSON_DB_FILE, updatedUser, modifiedUser.id);
            const result: IAPIResult<IUser> = {
                data: modifiedUser,
                ok: true,
                error: "",
            };
            return result;
        } else {
            const result: IAPIResult<IUser> = {
                data: modifiedUser,
                ok: false,
                error: "You can't change group",
            };
            return result;
        }
    } else {
        const result: IAPIResult<IUser> = {
            data: {} as IUser,
            ok: false,
            error: "User not found",
        };
        return result;
    }
};

export const changeUserRole = async (
    userId: string,
    role: ERole,
    user: IUser | null,
) => {
    const modifiedUser = getFromJsonFile<IUser>(USERS_JSON_DB_FILE, userId);
    if (modifiedUser && user) {
        if (isUserCanChangeRole(user, modifiedUser)) {
            const updatedUser = {
                ...modifiedUser,
                role,
            };
            updateInJsonFile(USERS_JSON_DB_FILE, updatedUser, modifiedUser.id);
            const result: IAPIResult<IUser> = {
                data: modifiedUser,
                ok: true,
                error: "",
            };
            return result;
        } else {
            const result: IAPIResult<IUser> = {
                data: modifiedUser,
                ok: false,
                error: "You can't change role",
            };
            return result;
        }
    } else {
        const result: IAPIResult<IUser> = {
            data: {} as IUser,
            ok: false,
            error: "User not found",
        };
        return result;
    }
};
