import {
    getProductTransactions,
    getProductTransactionsByStatus,
    getProductTransactionsByUser,
} from "@/services/product-transactions";
import {ETransactionStatus, IProductTransaction} from "@/types/data";
import {Dispatch, SetStateAction, useEffect, useState} from "react";

export const useProductTransactions = (
    user?: string,
    status?: ETransactionStatus,
    force: boolean = false,
) => {
    const [productTransactions, setProductTransactions] = useState<
        IProductTransaction[]
    >([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const changeProductTransactions: Dispatch<
        SetStateAction<IProductTransaction[]>
    > = (value) => {
        setProductTransactions(value);
    };

    const getProductTransactionsHandler = async () => {
        console.log("in getProductTransactionsHandler");
        setLoading(true);
        try {
            if (!user && !status) {
                const result = await getProductTransactions();
                if (result.ok && result.data) {
                    setProductTransactions(result.data);
                }
            } else if (user && !status) {
                const result = await getProductTransactionsByUser(user);
                if (result.ok && result.data) {
                    setProductTransactions(result.data);
                }
            } else if (!user && status) {
                const result = await getProductTransactionsByStatus(status);
                if (result.ok && result.data) {
                    setProductTransactions(result.data);
                }
            }
        } catch (error) {
            setError(`error in get productTransactions => ${error}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (force) {
            if (user && user?.length > 0) {
                getProductTransactionsHandler();
            }
        } else {
            getProductTransactionsHandler();
        }
    }, [user, status, force]);

    return {
        productTransactions,
        loading,
        error,
        refetch: getProductTransactionsHandler,
        changeProductTransactions,
    };
};
