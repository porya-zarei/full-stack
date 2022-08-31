import {updateUser} from "@/services/users";
import {IAPIResult} from "@/types/api";
import {IUser} from "@/types/data";

import {useState} from "react";

export const useUpdateUser = () => {
    const [loading, setLoading] = useState(false);
    const handleUpdateUser = async (
        id: string,
        updatedUser: Partial<IUser>,
    ) => {
        try {
            setLoading(true);
            const result = await updateUser(id, updatedUser);
            return result;
        } catch (error) {
            console.log("error in use update user", error);
        } finally {
            setLoading(false);
        }
        return {
            data: null,
            ok: false,
            error: "مشکلی رخ داده است",
        } as IAPIResult<null>;
    };
    return {
        handleUpdateUser,
        loading,
    };
};
