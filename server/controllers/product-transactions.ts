import {IAPIResult} from "@/types/api";
import {
    ERole,
    ETransactionStatus,
    ICreateProductCategory,
    ICreateProductTransaction,
    IDBProductTransaction,
} from "@/types/data";
import {NextApiHandler} from "next";
import {
    createProductCategory,
    deleteProductCategory,
    getAllProductCategories,
    getProductCategoriesByGroup,
    getProductCategory,
} from "../actions/product-category";
import {
    createProductTransaction,
    deleteProductTransaction,
    getAllProductTransactions,
    getProductTransaction,
    getProductTransactionsByStatus,
    getProductTransactionsByUser,
    getProductTransactionsForConfirmation,
    updateProductTransaction,
} from "../actions/product-transactions";
import {getTokenFromRequest, getUserFromToken} from "../utils/jwt-helper";
import {logger} from "../utils/logger";
import {
    isUserCanConfirmTransaction,
    isUserCanModifyProductCategories,
    isUserCanModifyTransactions,
} from "../utils/premissions";

export const getProductCategoriesHandler: NextApiHandler = async (req, res) => {
    try {
        const token = getTokenFromRequest(req);
        if (token) {
            const result = await getAllProductCategories();
            logger.log(
                `getAllProductCategoriesHandler: ${JSON.stringify(
                    result.data,
                )}`,
            );
            res.status(200).json(result);
        } else {
            const result: IAPIResult<string> = {
                data: "",
                ok: false,
                error: "Unauthorized",
            };
            res.status(401).json(result);
        }
    } catch (error) {
        logger.error(error);
        const result: IAPIResult<string> = {
            data: "",
            ok: false,
            error: "Error getting product categories",
        };
        res.status(500).json(result);
    }
};

export const getProductCategoryHandler: NextApiHandler = async (req, res) => {
    try {
        const token = getTokenFromRequest(req);
        if (token) {
            const {id} = req.body as {id: string};
            logger.log(`getProductCategoryHandler id : ${id}`);
            const result = await getProductCategory(id);
            logger.log(
                `getProductCategoryHandler result : ${JSON.stringify(result)}`,
            );
            res.status(200).json(result);
        } else {
            const result: IAPIResult<string> = {
                data: "",
                ok: false,
                error: "Unauthorized",
            };
            res.status(401).json(result);
        }
    } catch (error) {
        logger.error(error);
        const result: IAPIResult<string> = {
            data: "",
            ok: false,
            error: "Error getting product categories",
        };
        res.status(500).json(result);
    }
};

export const getProductCategoryByGroupHandler: NextApiHandler = async (
    req,
    res,
) => {
    try {
        const token = getTokenFromRequest(req);
        if (token) {
            const {group} = req.body as {group: string};
            logger.log(`getProductCategoryByGroupHandler group : ${group}`);
            const result = await getProductCategoriesByGroup(group);
            logger.log(
                `getProductCategoryByGroupHandler result : ${JSON.stringify(
                    result,
                )}`,
            );
            res.status(200).json(result);
        } else {
            const result: IAPIResult<string> = {
                data: "",
                ok: false,
                error: "Unauthorized",
            };
            res.status(401).json(result);
        }
    } catch (error) {
        logger.error(error);
        const result: IAPIResult<string> = {
            data: "",
            ok: false,
            error: "Error getting product categories",
        };
        res.status(500).json(result);
    }
};

export const addProductCategoryHandler: NextApiHandler = async (req, res) => {
    try {
        const token = getTokenFromRequest(req);
        if (token) {
            const user = await getUserFromToken(token);
            if (user && isUserCanModifyProductCategories(user)) {
                const {productCategory} = req.body as {
                    productCategory: ICreateProductCategory;
                };
                logger.log(
                    `addProductCategoryHandler productCategory : ${JSON.stringify(
                        productCategory,
                    )}`,
                );
                const result = await createProductCategory(productCategory);
                logger.log(
                    `addProductCategoryHandler result : ${JSON.stringify(
                        result,
                    )}`,
                );
                res.status(200).json(result);
            } else {
                const result: IAPIResult<string> = {
                    data: "",
                    ok: false,
                    error: "Unauthorized",
                };
                res.status(401).json(result);
            }
        } else {
            const result: IAPIResult<string> = {
                data: "",
                ok: false,
                error: "Unauthorized",
            };
            res.status(401).json(result);
        }
    } catch (error) {
        logger.error(error);
        const result: IAPIResult<string> = {
            data: "",
            ok: false,
            error: "Error creating product category",
        };
        res.status(500).json(result);
    }
};

export const deleteProductCategoryHandler: NextApiHandler = async (
    req,
    res,
) => {
    try {
        const token = getTokenFromRequest(req);
        if (token) {
            const user = await getUserFromToken(token);
            if (user && isUserCanModifyProductCategories(user)) {
                const {id} = req.body as {id: string};
                logger.log(`deleteProductCategoryHandler id : ${id}`);
                const result = await deleteProductCategory(id);
                logger.log(
                    `deleteProductCategoryHandler result : ${JSON.stringify(
                        result,
                    )}`,
                );
                res.status(200).json(result);
            } else {
                const result: IAPIResult<string> = {
                    data: "",
                    ok: false,
                    error: "Unauthorized",
                };
                res.status(401).json(result);
            }
        } else {
            const result: IAPIResult<string> = {
                data: "",
                ok: false,
                error: "Unauthorized",
            };
            res.status(401).json(result);
        }
    } catch (error) {
        logger.error(error);
        const result: IAPIResult<string> = {
            data: "",
            ok: false,
            error: "Error deleting product category",
        };
        res.status(500).json(result);
    }
};

// product transactions

export const getAllProductTransactionsHandler: NextApiHandler = async (
    req,
    res,
) => {
    try {
        const token = getTokenFromRequest(req);
        if (token) {
            const result = await getAllProductTransactions();
            logger.log(
                `getAllProductTransactionsHandler: ${JSON.stringify(
                    result.data,
                )}`,
            );
            res.status(200).json(result);
        } else {
            const result: IAPIResult<string> = {
                data: "",
                ok: false,
                error: "Unauthorized",
            };
            res.status(401).json(result);
        }
    } catch (error) {
        logger.error(error);
        const result: IAPIResult<string> = {
            data: "",
            ok: false,
            error: "Error getting product transactions",
        };
        res.status(500).json(result);
    }
};

export const getProductTransactionHandler: NextApiHandler = async (
    req,
    res,
) => {
    try {
        const token = getTokenFromRequest(req);
        if (token) {
            const {id} = req.body as {id: string};
            logger.log(`getProductTransactionHandler id : ${id}`);
            const result = await getProductTransaction(id);
            logger.log(
                `getProductTransactionHandler result : ${JSON.stringify(
                    result,
                )}`,
            );
            res.status(200).json(result);
        } else {
            const result: IAPIResult<string> = {
                data: "",
                ok: false,
                error: "Unauthorized",
            };
            res.status(401).json(result);
        }
    } catch (error) {
        logger.error(error);
        const result: IAPIResult<string> = {
            data: "",
            ok: false,
            error: "Error getting product transaction",
        };
        res.status(500).json(result);
    }
};

export const addProductTransactionHandler: NextApiHandler = async (
    req,
    res,
) => {
    try {
        const token = getTokenFromRequest(req);
        if (token) {
            const user = await getUserFromToken(token);
            if (user) {
                const {productTransaction, inTransaction} = req.body as {
                    productTransaction: ICreateProductTransaction;
                    inTransaction: boolean;
                };
                const result = await createProductTransaction(
                    productTransaction,
                    inTransaction,
                    user,
                );
                logger.log(
                    `addProductTransactionHandler result : ${JSON.stringify(
                        result,
                    )}`,
                );
                res.status(200).json(result);
            } else {
                const result: IAPIResult<string> = {
                    data: "",
                    ok: false,
                    error: "Unauthorized",
                };
                res.status(401).json(result);
            }
        } else {
            const result: IAPIResult<string> = {
                data: "",
                ok: false,
                error: "Unauthorized",
            };
            res.status(401).json(result);
        }
    } catch (error) {
        logger.error(error);
        const result: IAPIResult<string> = {
            data: "",
            ok: false,
            error: "Error creating product transaction",
        };
        res.status(500).json(result);
    }
};

export const deleteProductTransactionHandler: NextApiHandler = async (
    req,
    res,
) => {
    try {
        const token = getTokenFromRequest(req);
        if (token) {
            const user = await getUserFromToken(token);
            if (user && isUserCanModifyTransactions(user)) {
                const {id} = req.body as {id: string};
                logger.log(`deleteProductTransactionHandler id : ${id}`);
                const result = await deleteProductTransaction(id);
                logger.log(
                    `deleteProductTransactionHandler result : ${JSON.stringify(
                        result,
                    )}`,
                );
                res.status(200).json(result);
            } else {
                const result: IAPIResult<string> = {
                    data: "",
                    ok: false,
                    error: "Unauthorized",
                };
                res.status(401).json(result);
            }
        } else {
            const result: IAPIResult<string> = {
                data: "",
                ok: false,
                error: "Unauthorized",
            };
            res.status(401).json(result);
        }
    } catch (error) {
        logger.error(error);
        const result: IAPIResult<string> = {
            data: "",
            ok: false,
            error: "Error deleting product transaction",
        };
        res.status(500).json(result);
    }
};

export const updateProductTransactionHandler: NextApiHandler = async (
    req,
    res,
) => {
    try {
        const token = getTokenFromRequest(req);
        if (token) {
            const user = await getUserFromToken(token);
            if (user && isUserCanModifyTransactions(user)) {
                const {productTransaction} = req.body as {
                    productTransaction: Partial<IDBProductTransaction> & {
                        id: string;
                    };
                };
                const result = await updateProductTransaction(
                    productTransaction?.id ?? "",
                    productTransaction,
                );
                logger.log(
                    `updateProductTransactionHandler result : ${JSON.stringify(
                        result,
                    )}`,
                );
                res.status(200).json(result);
            } else {
                const result: IAPIResult<string> = {
                    data: "",
                    ok: false,
                    error: "Unauthorized",
                };
                res.status(401).json(result);
            }
        } else {
            const result: IAPIResult<string> = {
                data: "",
                ok: false,
                error: "Unauthorized",
            };
            res.status(401).json(result);
        }
    } catch (error) {
        logger.error(error);
        const result: IAPIResult<string> = {
            data: "",
            ok: false,
            error: "Error updating product transaction",
        };
        res.status(500).json(result);
    }
};

export const getProductTransactionsByUserHandler: NextApiHandler = async (
    req,
    res,
) => {
    try {
        const token = getTokenFromRequest(req);
        if (token) {
            const user = await getUserFromToken(token);
            if (user) {
                const {id} = req.body as {id: string};
                logger.log(`getProductTransactionByUserHandler id : ${id}`);
                const result = await getProductTransactionsByUser(id);
                logger.log(
                    `getProductTransactionByUserHandler result : ${JSON.stringify(
                        result,
                    )}`,
                );
                res.status(200).json(result);
            } else {
                const result: IAPIResult<string> = {
                    data: "",
                    ok: false,
                    error: "Unauthorized",
                };
                res.status(401).json(result);
            }
        } else {
            const result: IAPIResult<string> = {
                data: "",
                ok: false,
                error: "Unauthorized",
            };
            res.status(401).json(result);
        }
    } catch (error) {
        logger.error(error);
        const result: IAPIResult<string> = {
            data: "",
            ok: false,
            error: "Error getting product transaction by user",
        };
        res.status(500).json(result);
    }
};

export const getProductTransactionsByStatusHandler: NextApiHandler = async (
    req,
    res,
) => {
    try {
        const token = getTokenFromRequest(req);
        if (token) {
            const user = await getUserFromToken(token);
            if (user) {
                const {status} = req.body as {status: ETransactionStatus};
                logger.log(
                    `getProductTransactionByStatusHandler status : ${status}`,
                );
                const result = await getProductTransactionsByStatus(status);
                logger.log(
                    `getProductTransactionByStatusHandler result : ${JSON.stringify(
                        result,
                    )}`,
                );
                res.status(200).json(result);
            } else {
                const result: IAPIResult<string> = {
                    data: "",
                    ok: false,
                    error: "Unauthorized",
                };
                res.status(401).json(result);
            }
        } else {
            const result: IAPIResult<string> = {
                data: "",
                ok: false,
                error: "Unauthorized",
            };
            res.status(401).json(result);
        }
    } catch (error) {
        logger.error(error);
        const result: IAPIResult<string> = {
            data: "",
            ok: false,
            error: "Error getting product transaction by status",
        };
        res.status(500).json(result);
    }
};

export const confirmProductTransactionHandler: NextApiHandler = async (
    req,
    res,
) => {
    try {
        const token = getTokenFromRequest(req);
        if (token) {
            const user = await getUserFromToken(token);
            if (user && isUserCanConfirmTransaction(user)) {
                const {id, confirm, inTransaction} = req.body as {
                    id: string;
                    confirm: boolean;
                    inTransaction: boolean;
                };
                logger.log(`confirmTransactionHandler id : ${id}`);
                let status = ETransactionStatus.CANCELED_BY_SUPERVISOR;
                if (confirm) {
                    if (user.role === ERole.ADMIN) {
                        status = inTransaction
                            ? ETransactionStatus.PENDING_FOR_CONFIRM_IN
                            : ETransactionStatus.PENDING_FOR_CONFIRM_OUT;
                    } else {
                        status = inTransaction
                            ? ETransactionStatus.IN_CONFIRMED
                            : ETransactionStatus.OUT_CONFIRMED;
                    }
                } else {
                    if (user.role === ERole.ADMIN) {
                        status = ETransactionStatus.CANCELED_BY_SUPERVISOR;
                    } else {
                        status = inTransaction
                            ? ETransactionStatus.DENIED_IN
                            : ETransactionStatus.DENIED_OUT;
                    }
                }
                const result = await updateProductTransaction(id, {id, status});
                logger.log(
                    `confirmTransactionHandler result : ${JSON.stringify(
                        result,
                    )}`,
                );
                res.status(200).json(result);
            } else {
                const result: IAPIResult<string> = {
                    data: "",
                    ok: false,
                    error: "Unauthorized",
                };
                res.status(401).json(result);
            }
        } else {
            const result: IAPIResult<string> = {
                data: "",
                ok: false,
                error: "Unauthorized",
            };
            res.status(401).json(result);
        }
    } catch (error) {
        logger.error(error);
        const result: IAPIResult<string> = {
            data: "",
            ok: false,
            error: "Error confirming transaction",
        };
        res.status(500).json(result);
    }
};

export const getProductTransactionsForConfirmationHandler: NextApiHandler =
    async (req, res) => {
        try {
            const token = getTokenFromRequest(req);
            if (token) {
                const user = await getUserFromToken(token);
                if (user) {
                    const result = await getProductTransactionsForConfirmation(
                        user,
                    );
                    logger.log(
                        `getProductTransactionsForConfirmationHandler result : ${JSON.stringify(
                            result,
                        )}`,
                    );
                    res.status(200).json(result);
                } else {
                    const result: IAPIResult<null> = {
                        data: null,
                        ok: false,
                        error: "Unauthorized",
                    };
                    res.status(401).json(result);
                }
            } else {
                const result: IAPIResult<null> = {
                    data: null,
                    ok: false,
                    error: "Unauthorized",
                };
                res.status(401).json(result);
            }
        } catch (error) {
            logger.error(error);
            const result: IAPIResult<null> = {
                data: null,
                ok: false,
                error: "Error getting product transaction for confirmation",
            };
            res.status(500).json(result);
        }
    };
