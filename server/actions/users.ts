import {IAPIResult, ILoginData} from "@/types/api";
import {IUser} from "@/types/data";
import {
    addToJsonFile,
    deleteFromJsonFile,
    getAllFromJsonFile,
    getFromJsonFile,
    updateInJsonFile,
} from "../utils/json-database";

export const getAllUsers = async () => {
    const users = getAllFromJsonFile<IUser>("../local-db/users.json");
    const result: IAPIResult<IUser[]> = {
        data: users,
        ok: true,
        error: "",
    };
    return result;
};

export const getUser = async (id: string) => {
    const user = getFromJsonFile<IUser>("../local-db/users.json", id);
    const result: IAPIResult<IUser> = {
        data: user,
        ok: true,
        error: "",
    };
    return result;
};

export const addUser = async (user: IUser) => {
    addToJsonFile("../local-db/users.json", user);
    const result: IAPIResult<IUser> = {
        data: user,
        ok: true,
        error: "",
    };
    return result;
};

export const updateUser = async (user: IUser) => {
    updateInJsonFile("../local-db/users.json", user, user.id);
    const result: IAPIResult<IUser> = {
        data: user,
        ok: true,
        error: "",
    };
    return result;
};

export const deleteUser = async (id: string) => {
    deleteFromJsonFile("../local-db/users.json", id);
    const result: IAPIResult<string> = {
        data: "ok",
        ok: true,
        error: "",
    };
    return result;
};

export const registerUser = async (user: IUser) => {
    addToJsonFile("../local-db/users.json", user);
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
    const users = getAllFromJsonFile<IUser>("../local-db/users.json");
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
