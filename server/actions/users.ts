import {IAPIResult, ILoginData} from "@/types/api";
import {EGroup, ERole, ICreateUser, IUser, UnCertainData} from "@/types/data";
import {Types} from "mongoose";
import {
    createUserMDB,
    deleteOrderMDB,
    deleteUserMDB,
    getUserMDB,
    getUsersMDB,
    getUserWithUserNamePasswordMDB,
    updateUserMDB,
} from "../mongoose/functions";
import {logger} from "../utils/logger";
import {
    isUserCanChangeGroup,
    isUserCanChangeRole,
    isUserCanDeleteUser,
} from "../utils/premissions";
import {uuidGenerator} from "../utils/uuid-helper";

export const getAllUsers = async (role?: ERole | null) => {
    const users = await getUsersMDB();
    const result: IAPIResult<UnCertainData<IUser[]>> = {
        data: role ? users?.filter((user) => user?.role === role) : users,
        ok: !!users,
        error: "",
    };
    logger.log(`getAllUsers: ${JSON.stringify(result)}`);
    return result;
};

export const getUser = async (id: string) => {
    const user = await getUserMDB(id);
    const result: IAPIResult<UnCertainData<IUser>> = {
        data: user,
        ok: !!user,
        error: "",
    };
    return result;
};

export const addUser = async (userData: ICreateUser) => {
    const id = new Types.ObjectId().toString();
    const user: IUser = {
        ...userData,
        id: id,
        _id: id,
        joinedAt: new Date().toISOString(),
        role: ERole.USER,
    };
    const createdUser = await createUserMDB(user);
    const result: IAPIResult<UnCertainData<IUser>> = {
        data: createdUser,
        ok: !!createdUser,
        error: "",
    };
    return result;
};

export const updateUser = async (userData: Partial<IUser> & {id: string}) => {
    const updatedUser = await updateUserMDB(userData.id, userData);
    const result: IAPIResult<UnCertainData<IUser>> = {
        data: updatedUser,
        ok: !!updatedUser,
        error: "",
    };
    return result;
};

export const deleteUser = async (id: string, user: UnCertainData<IUser>) => {
    const modifiedUser = await getUserMDB(id);
    logger.log(`deleteUser: ${JSON.stringify(modifiedUser)}, ${JSON.stringify(user)}`);
    if (user && modifiedUser && isUserCanDeleteUser(user, modifiedUser)) {
        const deletedUser = await deleteUserMDB(id);
        logger.log(`deletedUser: ${JSON.stringify(deletedUser)}`);
        const result: IAPIResult<string> = {
            data: "deleted",
            ok: true,
            error: "",
        };
        return result;
    } else {
        const result: IAPIResult<string> = {
            data: "",
            ok: false,
            error: "You can't delete this user",
        };
        return result;
    }
};

export const registerUser = async (userData: ICreateUser) => {
    const id = new Types.ObjectId().toString();
    const user: IUser = {
        ...userData,
        id: id,
        _id: id,
        joinedAt: new Date().toISOString(),
        role: ERole.USER,
    };
    const registeredUser = await createUserMDB(user);
    const result: IAPIResult<UnCertainData<IUser>> = {
        data: registeredUser,
        ok: !!registeredUser,
        error: "",
    };
    return result;
};

export const getUserWithUserNamePassword = async (
    userName: string,
    password: string,
) => {
    const user = await getUserWithUserNamePasswordMDB(userName, password);
    return user;
};

export const loginUser = async (loginData: ILoginData) => {
    const user = await getUserWithUserNamePassword(
        loginData.userName,
        loginData.password,
    );
    const result: IAPIResult<UnCertainData<IUser>> = {
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
    const modifiedUser = await getUserMDB(userId);
    logger.log(
        `changeUserGroup: ${userId} ${group} ${JSON.stringify(modifiedUser)}`,
    );
    if (modifiedUser && user) {
        if (isUserCanChangeGroup(user, modifiedUser)) {
            let updatingUser = {
                group: Number(group),
            };
            const updatedUser = await updateUserMDB(
                modifiedUser.id,
                updatingUser,
            );
            const result: IAPIResult<UnCertainData<IUser>> = {
                data: updatedUser,
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
    const modifiedUser = await getUserMDB(userId);
    if (modifiedUser && user) {
        if (isUserCanChangeRole(user, modifiedUser)) {
            const updatingUser = {
                role: Number(role),
            };
            const updatedUser = await updateUserMDB(
                modifiedUser.id,
                updatingUser,
            );
            const result: IAPIResult<UnCertainData<IUser>> = {
                data: updatedUser,
                ok: !!updatedUser,
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
