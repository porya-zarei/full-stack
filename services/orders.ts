import {API_ROUTES} from "@/server/constants/routes";
import {IAPIResult} from "@/types/api";
import {IOrder} from "@/types/data";
import {axios_instance} from "./axios";

export const createOrder = async (order: IOrder) => {
    try {
        const result = await axios_instance.post<IAPIResult<IOrder>>(
            API_ROUTES.orders.addOrder,
            order,
        );
        return result.data;
    } catch (error) {
        console.log("error in create order => ", error);
        const result: IAPIResult<IOrder | null> = {
            data: null,
            error: "error in create order",
            ok: false,
        };
        return result;
    }
};

export const getOrders = async () => {
    try {
        const result = await axios_instance.get<IAPIResult<IOrder[]>>(
            API_ROUTES.orders.getAllOrders,
        );
        return result.data;
    } catch (error) {
        console.log("error in get orders => ", error);
        const result: IAPIResult<IOrder[]> = {
            data: [] as IOrder[],
            error: "error in get orders",
            ok: false,
        };
        return result;
    }
};

export const getOrder = async (id: string) => {
    try {
        const result = await axios_instance.get<IAPIResult<IOrder>>(
            API_ROUTES.orders.getOrder + "/" + id,
        );
        return result.data;
    } catch (error) {
        console.log("error in get order => ", error);
        const result: IAPIResult<IOrder | null> = {
            data: null,
            error: "error in get order",
            ok: false,
        };
        return result;
    }
};

export const getPendingOrders = async (userId: string) => {
    try {
        const result = await axios_instance.get<IAPIResult<IOrder[]>>(
            API_ROUTES.orders.getPendingOrders + "/" + userId,
        );
        return result.data;
    } catch (error) {
        console.log("error in get pending orders => ", error);
        const result: IAPIResult<IOrder[]> = {
            data: [] as IOrder[],
            error: "error in get pending orders",
            ok: false,
        };
        return result;
    }
};

export const getUserOrders = async (userId: string) => {
    try {
        const result = await axios_instance.get<IAPIResult<IOrder[]>>(
            API_ROUTES.orders.userOrders + "/" + userId,
        );
        return result.data;
    } catch (error) {
        console.log("error in get user orders => ", error);
        const result: IAPIResult<IOrder[]> = {
            data: [] as IOrder[],
            error: "error in get user orders",
            ok: false,
        };
        return result;
    }
};
