import {API_ROUTES} from "@/server/constants/routes";
import {IAPIResult} from "@/types/api";
import {ICreateOrder, IDBOrder, IOrder} from "@/types/data";
import {axios_instance} from "./axios";

export const createOrder = async (order: ICreateOrder) => {
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
        const result = await axios_instance.post<IAPIResult<IOrder>>(
            API_ROUTES.orders.getOrder,
            {id},
            {headers: {"Content-Type": "application/json"}},
        );
        console.log("result in get order => ", result);
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
        console.log("id => ", userId);
        const result = await axios_instance.post<IAPIResult<IOrder[]>>(
            API_ROUTES.orders.getPendingOrders,
            {id: userId},
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
        const result = await axios_instance.post<IAPIResult<IOrder[]>>(
            API_ROUTES.orders.userOrders,
            {id: userId},
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

export const updateOrder = async (
    id: string,
    updatedOrder?: Partial<IDBOrder>,
) => {
    try {
        const result = await axios_instance.post<IAPIResult<IOrder>>(
            API_ROUTES.orders.updateOrder,
            {id, order: updatedOrder},
        );
        return result.data;
    } catch (error) {
        console.log("error in update order status => ", error);
        const result: IAPIResult<IOrder | null> = {
            data: null,
            error: "error in update order status",
            ok: false,
        };
        return result;
    }
};

export const updateOrderStatus = async (
    id: string,
    confirmed: boolean,
    responseText: string = "",
) => {
    try {
        const result = await axios_instance.post<IAPIResult<IOrder>>(
            API_ROUTES.orders.updateOrderStatus,
            {id, confirmed, responseText},
        );
        return result.data;
    } catch (error) {
        console.log("error in update order status => ", error);
        const result: IAPIResult<IOrder | null> = {
            data: null,
            error: "error in update order status",
            ok: false,
        };
        return result;
    }
};

export const checkMoneyLimit = async (id: string, money: string) => {
    try {
        const result = await axios_instance.post<IAPIResult<boolean>>(
            API_ROUTES.orders.checkMoneyLimit,
            {id, money},
        );
        return result.data;
    } catch (error) {
        console.log("error in check money limit => ", error);
        const result: IAPIResult<boolean> = {
            data: false,
            error: "error in check money limit",
            ok: false,
        };
        return result;
    }
};

export const deleteOrder = async (id: string) => {
    try {
        const result = await axios_instance.post<IAPIResult<boolean>>(
            API_ROUTES.orders.deleteOrder,
            {id},
        );
        return result.data;
    } catch (error) {
        console.log("error in delete => ", error);
        const result: IAPIResult<boolean> = {
            data: false,
            error: "error in delete",
            ok: false,
        };
        return result;
    }
};
