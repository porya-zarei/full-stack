import {getUsers} from "@/services/users";
import {ERole, IUser} from "@/types/data";
import {useEffect, useState} from "react";

export const useUsers = (role?: ERole | null) => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const getUsersHandler = async () => {
        setLoading(true);
        try {
            const result = await getUsers(role);
            if (result.ok && result.data) {
                setUsers(result.data);
            }
        } catch (error) {
            setError(`error in get users => ${error}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUsersHandler();
    }, [role]);

    return {users, loading, error, refetch: getUsersHandler};
};
