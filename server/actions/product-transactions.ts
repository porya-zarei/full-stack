import {IAPIResult} from "@/types/api";
import {
    ERole,
    ETransactionStatus,
    ICreateProductTransaction,
    IDBProductTransaction,
    IProductTransaction,
    IUser,
} from "@/types/data";
import {Types} from "mongoose";
import {
    createProductTransactionMDB,
    deleteProductTransactionMDB,
    getProductTransactionMDB,
    getProductTransactionsByStatusMDB,
    getProductTransactionsByUserMDB,
    getProductTransactionsMDB,
    updateProductTransactionMDB,
} from "../mongoose/functions";

export const getAllProductTransactions = async () => {
    const productTransactions = await getProductTransactionsMDB();
    if (productTransactions) {
        const result: IAPIResult<IProductTransaction[]> = {
            data: productTransactions,
            ok: productTransactions.length > 0,
            error: "",
        };
        return result;
    }
    return {
        data: null,
        ok: false,
        error: "no product transactions found",
    } as IAPIResult<IProductTransaction[] | null>;
};

export const getProductTransaction = async (id: string) => {
    const productTransaction = await getProductTransactionMDB(id);
    if (productTransaction) {
        const result: IAPIResult<IProductTransaction> = {
            data: productTransaction,
            ok: !!productTransaction,
            error: "",
        };
        return result;
    }
    return {
        data: null,
        ok: false,
        error: "product transaction not found",
    } as IAPIResult<IProductTransaction | null>;
};

export const createProductTransaction = async (
    productTransaction: ICreateProductTransaction,
    inTransaction: boolean,
    user: IUser,
) => {
    const id = new Types.ObjectId().toString();
    let status = 0;
    if (user.role === ERole.ADMIN) {
        status = inTransaction
            ? ETransactionStatus.PENDING_FOR_CONFIRM_IN
            : ETransactionStatus.PENDING_FOR_CONFIRM_OUT;
    } else if (user.role === ERole.USER) {
        status = inTransaction
            ? ETransactionStatus.PENDING_FOR_SUPERVISOR_CONFIRM_IN
            : ETransactionStatus.PENDING_FOR_SUPERVISOR_CONFIRM_OUT;
    } else {
        status = inTransaction
            ? ETransactionStatus.IN_CONFIRMED
            : ETransactionStatus.OUT_CONFIRMED;
    }
    const newProductTransaction = await createProductTransactionMDB({
        ...productTransaction,
        id,
        _id: id,
        date: new Date().toString(),
        key: productTransaction?.key || "",
        status,
    });
    if (newProductTransaction) {
        const result: IAPIResult<IProductTransaction> = {
            data: newProductTransaction,
            ok: !!newProductTransaction,
            error: "",
        };
        return result;
    }
    return {
        data: null,
        ok: false,
        error: "product transaction not created",
    } as IAPIResult<IProductTransaction | null>;
};

export const updateProductTransaction = async (
    id: string,
    productTransaction: Partial<IDBProductTransaction>,
) => {
    const updatedProductTransaction = await updateProductTransactionMDB(
        id,
        productTransaction,
    );
    if (updatedProductTransaction) {
        const result: IAPIResult<IProductTransaction> = {
            data: updatedProductTransaction,
            ok: !!updatedProductTransaction,
            error: "",
        };
        return result;
    }
    return {
        data: null,
        ok: false,
        error: "product transaction not updated",
    } as IAPIResult<IProductTransaction | null>;
};

export const deleteProductTransaction = async (id: string) => {
    const deletedProductTransaction = await deleteProductTransactionMDB(id);
    if (deletedProductTransaction) {
        const result: IAPIResult<string> = {
            data: "deleted",
            ok: true,
            error: "",
        };
        return result;
    }
    return {
        data: null,
        ok: false,
        error: "product transaction not deleted",
    } as IAPIResult<IProductTransaction | null>;
};

export const getProductTransactionsByUser = async (userId: string) => {
    const productTransactions = await getProductTransactionsByUserMDB(userId);
    if (productTransactions) {
        const result: IAPIResult<IProductTransaction[]> = {
            data: productTransactions,
            ok: productTransactions.length > 0,
            error: "",
        };
        return result;
    }
    return {
        data: null,
        ok: false,
        error: "no product transactions found",
    } as IAPIResult<IProductTransaction[] | null>;
};

export const getProductTransactionsByStatus = async (
    status: ETransactionStatus,
) => {
    const productTransactions = await getProductTransactionsByStatusMDB(status);
    if (productTransactions) {
        const result: IAPIResult<IProductTransaction[]> = {
            data: productTransactions,
            ok: productTransactions.length > 0,
            error: "",
        };
        return result;
    }
    return {
        data: null,
        ok: false,
        error: "no product transactions found",
    } as IAPIResult<IProductTransaction[] | null>;
};

export const getProductTransactionsForConfirmation = async (user: IUser) => {
    const productTransactions = await getProductTransactionsMDB();
    if (productTransactions) {
        if (user.role === ERole.ADMIN) {
            const data = productTransactions
                .filter((tr) => tr?.user?.group?.id === user?.group?.id)
                .filter(
                    (tr) =>
                        tr?.status ===
                            ETransactionStatus?.PENDING_FOR_SUPERVISOR_CONFIRM_IN ||
                        tr?.status ===
                            ETransactionStatus?.PENDING_FOR_SUPERVISOR_CONFIRM_OUT,
                );
            const result: IAPIResult<IProductTransaction[]> = {
                data,
                ok: true,
                error: "",
            };
            return result;
        } else if (user.role === ERole.CREATOR) {
            const data = productTransactions;
            const result: IAPIResult<IProductTransaction[]> = {
                data,
                ok: true,
                error: "",
            };
            return result;
        } else {
            const result: IAPIResult<IProductTransaction[]> = {
                data: [],
                ok: true,
                error: "",
            };
            return result;
        }
    }
    return {
        data: null,
        ok: false,
        error: "no product transactions found",
    } as IAPIResult<IProductTransaction[] | null>;
};
