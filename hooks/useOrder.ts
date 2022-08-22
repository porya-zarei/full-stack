import {getOrder} from "@/services/orders";
import {IOrder} from "@/types/data";
import {Dispatch, SetStateAction, useEffect, useState} from "react";

export const useOrder = (orderId: string) => {
    const [order, setOrder] = useState<IOrder>({} as IOrder);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const getOrderHandler = async () => {
        try {
            setLoading(true);
            const result = await getOrder(orderId);
            console.log("order in usOrder => ", result);
            if (result.ok && result.data) {
                setOrder(result.data);
            }
        } catch (error) {
            setError(`error in get order => ${error}`);
        } finally {
            setLoading(false);
        }
    };

    const changeOrder: Dispatch<SetStateAction<IOrder>> = (value) => {
        setOrder(value);
    };

    useEffect(() => {
        getOrderHandler();
    }, [orderId]);

    return {order, loading, error, refetch: getOrderHandler,changeOrder};
};
