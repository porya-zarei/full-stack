import { getAccessKeys } from "@/services/access-keys";
import {IAccessKey} from "@/types/data";
import {useState, useEffect, SetStateAction, Dispatch} from "react";

export const useAccessKeys = () => {
    const [accessKeys, setAccessKeys] = useState<IAccessKey[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const changeAccessKeys: Dispatch<SetStateAction<IAccessKey[]>> = (
        value,
    ) => {
        setAccessKeys(value);
    };

    const getAccessKeysHandler = async () => {
        setLoading(true);
        try {
            const result = await getAccessKeys();
            if (result.ok && result.data) {
                setAccessKeys(result.data);
            }
        } catch (error) {
            setError(`error in get accessKeys => ${error}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        accessKeys.length === 0 && getAccessKeysHandler();
    }, []);

    return {
        accessKeys,
        loading,
        error,
        refetch: getAccessKeysHandler,
        changeAccessKeys,
    };
};
