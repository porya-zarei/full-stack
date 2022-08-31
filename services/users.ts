import {API_ROUTES} from "@/server/constants/routes";
import {IAPIResult} from "@/types/api";
import {ERole, IUser} from "@/types/data";
import {axios_instance} from "./axios";

export const getUsers = async (role?: ERole | null) => {
    try {
        const result = await axios_instance.post<IAPIResult<IUser[]>>(
            API_ROUTES.users.getAllUsers,
            {id: role},
        );
        return result.data;
    } catch (error) {
        console.log("error in get users => ", error);
        const result: IAPIResult<IUser[]> = {
            data: [] as IUser[],
            error: "error in get users",
            ok: false,
        };
        return result;
    }
};

export const getUser = async (id?: string) => {
    try {
        const result = await axios_instance.post<IAPIResult<IUser>>(
            API_ROUTES.users.getUser,
            {id},
        );
        return result.data;
    } catch (error) {
        console.log("error in get users => ", error);
        const result: IAPIResult<IUser> = {
            data: {} as IUser,
            error: "error in get users",
            ok: false,
        };
        return result;
    }
};

export const changeRole = async (id: string, role: ERole) => {
    try {
        const result = await axios_instance.post<IAPIResult<IUser>>(
            API_ROUTES.users.changeUserRole,
            {id, role},
        );
        return result.data;
    } catch (error) {
        console.log("error in change role => ", error);
        const result: IAPIResult<IUser | null> = {
            data: null,
            error: "error in change role",
            ok: false,
        };
        return result;
    }
};

export const changeGroup = async (id: string, group: string) => {
    try {
        const result = await axios_instance.post<IAPIResult<IUser>>(
            API_ROUTES.users.changeUserGroup,
            {id, group},
        );
        return result.data;
    } catch (error) {
        console.log("error in change group => ", error);
        const result: IAPIResult<IUser | null> = {
            data: null,
            error: "error in change group",
            ok: false,
        };
        return result;
    }
};

export const deleteUser = async (id: string) => {
    try {
        const result = await axios_instance.post<IAPIResult<IUser>>(
            API_ROUTES.users.deleteUser,
            {id},
        );
        return result.data;
    } catch (error) {
        console.log("error in delete user => ", error);
        const result: IAPIResult<IUser | null> = {
            data: null,
            error: "error in delete user",
            ok: false,
        };
        return result;
    }
};

export const updateUser = async (id: string, updatedUser: Partial<IUser>) => {
    try {
        const result = await axios_instance.post<IAPIResult<IUser>>(
            API_ROUTES.users.updateUser,
            {user:updatedUser,id},
        );
        return result.data;
    } catch (error) {
        console.log("error in update user => ", error);
        const result: IAPIResult<IUser | null> = {
            data: null,
            error: "error in update user",
            ok: false,
        };
        return result;
    }
};
