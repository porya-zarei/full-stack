import {
    getProductTransactionsForConfirmation,
} from "@/services/product-transactions";
import { ERole, IProductTransaction} from "@/types/data";
import {Dispatch, SetStateAction, useEffect, useState} from "react";

export const usePendingTransactions = () => {
    const [pendingTransactions, setPendingTransactions] = useState<
        IProductTransaction[]
    >([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const changePendingTransactions: Dispatch<
        SetStateAction<IProductTransaction[]>
    > = (value) => {
        setPendingTransactions(value);
    };

    const getPendingTransactionsHandler = async () => {
        console.log("in getPendingTransactionsHandler");
        setLoading(true);
        try {
            const result = await getProductTransactionsForConfirmation();
            if (result?.ok) {
                setPendingTransactions(result.data);
            } else {
                console.log("error in getPendingTransactionsHandler", result);
                setError(result?.error ?? "");
            }
        } catch (error) {
            setError(`error in get pendingTransactions => ${error}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
       getPendingTransactionsHandler();
    }, []);

    return {
        pendingTransactions,
        loading,
        error,
        refetch: getPendingTransactionsHandler,
        changePendingTransactions,
    };
};
