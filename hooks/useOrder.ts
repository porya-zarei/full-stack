import {getOrder} from "@/services/orders";
import {IOrder} from "@/types/data";
import {useEffect, useState} from "react";

export const useOrder = (orderId: string) => {
    const [order, setOrder] = useState<IOrder>({} as IOrder);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const getOrdersHandler = async () => {
        setLoading(true);
        try {
            const result = await getOrder(orderId);
            if (result.ok && result.data) {
                setOrder(result.data);
            }
        } catch (error) {
            setError(`error in get order => ${error}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getOrdersHandler();
    }, [orderId]);

    return {order, loading, error};
};
