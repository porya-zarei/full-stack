import {getOrders, getPendingOrders, getUserOrders} from "@/services/orders";
import {IOrder} from "@/types/data";
import {useEffect, useState} from "react";

export const useOrders = (
    userId?: string | null,
    type?: "pending" | "all" | null,
    force: boolean = false,
) => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const getOrdersHandler = async () => {
        console.log("in getOrdersHandler");
        setLoading(true);
        try {
            if (userId) {
                if (type === "pending") {
                    const result = await getPendingOrders(userId);
                    console.log("result in get pending => ", result);
                    if (result.ok && result.data) {
                        setOrders(result.data);
                    }
                } else {
                    const result = await getUserOrders(userId);
                    if (result.ok && result.data) {
                        setOrders(result.data);
                    }
                }
            } else {
                const result = await getOrders();
                if (result.ok && result.data) {
                    console.log("result.data in get orders => ", result.data);
                    setOrders(result.data);
                }
            }
        } catch (error) {
            setError(`error in get orders => ${error}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (force) {
            if (userId) {
                orders?.length === 0 && getOrdersHandler();
            }
        } else {
            orders?.length === 0 && getOrdersHandler();
        }
    }, [userId, force]);

    return {orders, loading, error, refetch: getOrdersHandler};
};
