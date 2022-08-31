import {getUser} from "@/services/users";
import {IUser} from "@/types/data";
import {useEffect, useState, Dispatch, SetStateAction} from "react";

export const useUser = (id?: string, force: boolean = false) => {
    const [user, setUser] = useState<IUser>({} as IUser);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const changeUser: Dispatch<SetStateAction<IUser>> = (value) => {
        setUser(value);
    };

    const getUserHandler = async () => {
        setLoading(true);
        try {
            const result = await getUser(id);
            if (result.ok && result.data) {
                setUser(result.data);
            }
        } catch (error) {
            setError(`error in get user => ${error}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (force && id && id?.length > 0) {
            getUserHandler();
        } else {
            getUserHandler();
        }
    }, [id]);

    return {user, loading, error, refetch: getUserHandler,changeUser};
};
