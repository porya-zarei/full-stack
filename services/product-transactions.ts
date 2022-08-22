import {API_ROUTES} from "@/server/constants/routes";
import {IAPIResult} from "@/types/api";
import {
    ETransactionStatus,
    ICreateProductTransaction,
    IDBProductTransaction,
    IProductTransaction,
} from "@/types/data";
import {axios_instance} from "./axios";

export const getProductTransactions = async () => {
    try {
        const result = await axios_instance.post<
            IAPIResult<IProductTransaction[]>
        >(API_ROUTES.productTransactions.getAllProductTransactions);
        return result.data;
    } catch (error) {
        console.log("error in get product transactions => ", error);
        const result: IAPIResult<IProductTransaction[]> = {
            data: [] as IProductTransaction[],
            error: "error in get product transactions",
            ok: false,
        };
        return result;
    }
};

export const getProductTransaction = async (id: string) => {
    try {
        const result = await axios_instance.post<
            IAPIResult<IProductTransaction>
        >(API_ROUTES.productTransactions.getProductTransaction, {
            id,
        });
        return result.data;
    } catch (error) {
        console.log("error in get product transaction => ", error);
        const result: IAPIResult<IProductTransaction> = {
            data: {} as IProductTransaction,
            error: "error in get product transaction",
            ok: false,
        };
        return result;
    }
};

export const addProductTransaction = async (
    productTransaction: ICreateProductTransaction,
    inTransaction: boolean,
) => {
    try {
        console.log(
            "productTransaction => ",
            productTransaction,
            inTransaction,
        );
        const result = await axios_instance.post<
            IAPIResult<IProductTransaction>
        >(API_ROUTES.productTransactions.addProductTransaction, {
            productTransaction,
            inTransaction,
        });
        return result.data;
    } catch (error) {
        console.log("error in add product transaction => ", error);
        const result: IAPIResult<IProductTransaction> = {
            data: {} as IProductTransaction,
            error: "error in add product transaction",
            ok: false,
        };
        return result;
    }
};

export const updateProductTransaction = async (
    productTransaction: Partial<IDBProductTransaction>,
) => {
    try {
        const result = await axios_instance.post<
            IAPIResult<IProductTransaction>
        >(API_ROUTES.productTransactions.updateProductTransaction, {
            productTransaction,
        });
        return result.data;
    } catch (error) {
        console.log("error in update product transaction => ", error);
        const result: IAPIResult<IProductTransaction> = {
            data: {} as IProductTransaction,
            error: "error in update product transaction",
            ok: false,
        };
        return result;
    }
};

export const deleteProductTransaction = async (id: string) => {
    try {
        const result = await axios_instance.post<IAPIResult<string>>(
            API_ROUTES.productTransactions.deleteProductTransaction,
            {
                id,
            },
        );
        return result.data;
    } catch (error) {
        console.log("error in delete product transaction => ", error);
        const result: IAPIResult<string> = {
            data: "",
            error: "error in delete product transaction",
            ok: false,
        };
        return result;
    }
};

export const getProductTransactionsByUser = async (userId: string) => {
    try {
        const result = await axios_instance.post<
            IAPIResult<IProductTransaction[]>
        >(API_ROUTES.productTransactions.getProductTransactionsByUser, {
            id: userId,
        });
        return result.data;
    } catch (error) {
        console.log("error in get product transactions by user => ", error);
        const result: IAPIResult<IProductTransaction[]> = {
            data: [] as IProductTransaction[],
            error: "error in get product transactions by user",
            ok: false,
        };
        return result;
    }
};

export const getProductTransactionsByStatus = async (
    status: ETransactionStatus,
) => {
    try {
        const result = await axios_instance.post<
            IAPIResult<IProductTransaction[]>
        >(API_ROUTES.productTransactions.getProductTransactionsByStatus, {
            status,
        });
        return result.data;
    } catch (error) {
        console.log("error in get product transactions by status => ", error);
        const result: IAPIResult<IProductTransaction[]> = {
            data: [] as IProductTransaction[],
            error: "error in get product transactions by status",
            ok: false,
        };
        return result;
    }
};

export const confirmProductTransaction = async (
    id: string,
    confirm: boolean,
    inTransaction: boolean,
) => {
    try {
        const result = await axios_instance.post<
            IAPIResult<IProductTransaction>
        >(API_ROUTES.productTransactions.confirmProductTransaction, {
            id,
            confirm,
            inTransaction,
        });
        return result.data;
    } catch (error) {
        console.log("error in confirm product transaction => ", error);
        const result: IAPIResult<IProductTransaction> = {
            data: {} as IProductTransaction,
            error: "error in confirm product transaction",
            ok: false,
        };
        return result;
    }
};

export const getProductTransactionsForConfirmation = async () => {
    try {
        const result = await axios_instance.post<
            IAPIResult<IProductTransaction[]>
        >(API_ROUTES.productTransactions.getProductTransactionsForConfirmation);
        return result.data;
    } catch (error) {
        console.log(
            "error in get product transactions for confirmation => ",
            error,
        );
        const result: IAPIResult<IProductTransaction[]> = {
            data: [],
            error: "error in get product transactions for confirmation",
            ok: false,
        };
        return result;
    }
};
