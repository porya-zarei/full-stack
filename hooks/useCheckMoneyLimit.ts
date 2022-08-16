import {checkMoneyLimit} from "@/services/orders";
import {useState} from "react";

export const useCheckMoneyLimit = () => {
    const [isOk, setIsOk] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const getCheckMoneyLimitHandler = async (group: string, money: string) => {
        try {
            setLoading(true);
            setIsOk(false);
            const result = await checkMoneyLimit(group, money);
            if (result.ok) {
                setIsOk(result.data);
                result.data ? setError("") : setError("money limit exceeded");
                return result.data;
            }
        } catch (error) {
            setError(`error in check group money limit => ${error}`);
            return false;
        } finally {
            setLoading(false);
        }
        return false;
    };

    return {isOk, loading, error, checkMoneyLimit: getCheckMoneyLimitHandler};
};
