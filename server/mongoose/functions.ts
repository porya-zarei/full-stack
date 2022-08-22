import {
    ETransactionStatus,
    IDBOrder,
    IDBProductCategory,
    IDBProductTransaction,
    IDBUser,
    IGroup,
    IProductCategory,
    IProductTransaction,
    IUser,
} from "@/types/data";
import {Types} from "mongoose";
import {logger} from "../utils/logger";
import {getConnection} from "./connection";
import {
    GroupModel,
    OrderModel,
    ProductCategoryModel,
    ProductTransactionModel,
    UserModel,
} from "./models";

export const getGroupsMDB = async () => {
    try {
        const connection = await getConnection();
        if (connection) {
            const groups = await GroupModel.find().exec();
            return groups;
        }
        return null;
    } catch (error) {
        logger.error(error);
        return null;
    }
};

export const getUsersMDB = async () => {
    try {
        const connection = await getConnection();
        if (connection) {
            const users = await UserModel.find().exec();
            const groups = await GroupModel.find().exec();
            const usersWithGroups = users.map(
                (user) =>
                    ({
                        ...user.toObject(),
                        group: groups.find((group) => group.id === user.group),
                    } as IUser),
            );
            return usersWithGroups;
        }
        return null;
    } catch (error) {
        logger.error(error);
        return null;
    }
};

export const getOrdersMDB = async () => {
    try {
        const connection = await getConnection();
        if (connection.connection.readyState === 1) {
            const orders = await OrderModel.find().exec();
            return orders.map((order) => order.toObject());
        }
        return null;
    } catch (error) {
        logger.error(error);
        return null;
    }
};

export const getUserMDB = async (id: string) => {
    try {
        const connection = await getConnection();
        if (connection.connection.readyState === 1) {
            const user = await UserModel.findById(id).exec();
            const group = await GroupModel.findById(user?.group ?? "").exec();
            return {...user?.toObject(), group: group?.toObject()} as IUser;
        }
        return null;
    } catch (error) {
        logger.error(error);
        return null;
    }
};

export const getGroupMDB = async (id: string) => {
    try {
        const connection = await getConnection();
        if (connection.connection.readyState === 1) {
            const group = await GroupModel.findById(id).exec();
            return group?.toObject();
        }
        return null;
    } catch (error) {
        logger.error(error);
        return null;
    }
};

export const getOrderMDB = async (id: string) => {
    try {
        const connection = await getConnection();
        if (connection.connection.readyState === 1) {
            const order = await OrderModel.findById(id).exec();
            return order?.toObject();
        }
        return null;
    } catch (error) {
        logger.error(error);
        return null;
    }
};

export const createUserMDB = async (user: IDBUser) => {
    try {
        const connection = await getConnection();
        if (connection.connection.readyState === 1) {
            const newUser = await UserModel.create(user);
            const group = await GroupModel.findById(newUser.group).exec();
            return {...newUser.toObject(), group: group?.toObject()} as IUser;
        }
        return null;
    } catch (error) {
        logger.error(error);
        return null;
    }
};

export const createGroupMDB = async (group: IGroup) => {
    try {
        const connection = await getConnection();
        if (connection.connection.readyState === 1) {
            const newGroup = await GroupModel.create(group);
            return newGroup.toObject();
        }
        return null;
    } catch (error) {
        logger.error(error);
        return null;
    }
};

export const createOrderMDB = async (order: IDBOrder) => {
    try {
        const connection = await getConnection();
        if (connection.connection.readyState === 1) {
            const newOrder = await OrderModel.create(order);
            return newOrder.toObject();
        }
        return null;
    } catch (error) {
        logger.error(error);
        return null;
    }
};

export const updateUserMDB = async (id: string, user: Partial<IDBUser>) => {
    try {
        const connection = await getConnection();
        if (connection.connection.readyState === 1) {
            const updatedUser = await UserModel.findOneAndUpdate(
                {_id: new Types.ObjectId(id)},
                {...user},
                {
                    new: true,
                },
            ).exec();
            const group = await GroupModel.findById(
                updatedUser?.group ?? "",
            ).exec();
            logger.log(`updatedUser: ${JSON.stringify(updatedUser)}`);
            return {
                ...updatedUser?.toObject(),
                group: group?.toObject(),
            } as IUser;
        }
        return null;
    } catch (error) {
        logger.error(error);
        return null;
    }
};

export const updateGroupMDB = async (id: string, group: Partial<IGroup>) => {
    try {
        const connection = await getConnection();
        if (connection.connection.readyState === 1) {
            const updatedGroup = await GroupModel.findOneAndUpdate(
                {_id: new Types.ObjectId(id)},
                {...group},
                {
                    new: true,
                },
            ).exec();
            logger.log(`updatedGroup: ${JSON.stringify(updatedGroup)}`);
            return updatedGroup?.toObject();
        }
        return null;
    } catch (error) {
        logger.error(error);
        return null;
    }
};

export const updateOrderMDB = async (id: string, order: Partial<IDBOrder>) => {
    try {
        const connection = await getConnection();
        if (connection.connection.readyState === 1) {
            const updatedOrder = await OrderModel.findOneAndUpdate(
                {_id: new Types.ObjectId(id)},
                {...order},
                {
                    new: true,
                },
            ).exec();
            return updatedOrder?.toObject();
        }
        return null;
    } catch (error) {
        logger.error(error);
        return null;
    }
};

export const deleteUserMDB = async (id: string) => {
    try {
        const connection = await getConnection();
        if (connection.connection.readyState === 1) {
            const deletedUser = await UserModel.findOneAndDelete({
                _id: new Types.ObjectId(id),
            }).exec();
            logger.log(`deletedUser in mdb: ${JSON.stringify(deletedUser)}`);
            return deletedUser?.toObject();
        }
        return null;
    } catch (error) {
        logger.error(error);
        return null;
    }
};
export const deleteGroupMDB = async (id: string) => {
    try {
        const connection = await getConnection();
        if (connection.connection.readyState === 1) {
            const deletedGroup = await GroupModel.findOneAndDelete({
                _id: new Types.ObjectId(id),
            }).exec();
            logger.log(
                `deletedGroup in mdb: ${id} , ${JSON.stringify(deletedGroup)}`,
            );
            return deletedGroup?.toObject();
        }
        return null;
    } catch (error) {
        logger.error(error);
        return null;
    }
};

export const deleteGroupLimitYearMDB = async (
    groupId: string,
    yearLimitId: string,
) => {
    try {
        const connection = await getConnection();
        if (connection.connection.readyState === 1) {
            const updatedGroup = await GroupModel.findOneAndUpdate(
                {
                    _id: new Types.ObjectId(groupId),
                },
                {
                    $pull: {
                        moneyLimitYears: {_id: yearLimitId},
                    },
                },
                {
                    new: true,
                },
            ).exec();
            logger.log(
                `updatedGroup in delete year limit mdb: ${groupId} , ${JSON.stringify(
                    updatedGroup,
                )}`,
            );
            return updatedGroup?.toObject();
        }
        return null;
    } catch (error) {
        logger.error(error);
        return null;
    }
};

export const deleteOrderMDB = async (id: string) => {
    try {
        const connection = await getConnection();
        if (connection.connection.readyState === 1) {
            const deletedOrder = await OrderModel.findOneAndDelete({
                _id: new Types.ObjectId(id),
            }).exec();
            return deletedOrder?.toObject();
        }
        return null;
    } catch (error) {
        logger.error(error);
        return null;
    }
};

export const getUserWithUserNamePasswordMDB = async (
    userName: string,
    password: string,
) => {
    try {
        const connection = await getConnection();
        if (connection.connection.readyState === 1) {
            if (userName.match(/^[^@]+@[^@]+\.[^@]+$/)) {
                const user = await UserModel.findOne({
                    email: userName,
                    password,
                }).exec();
                const group = await GroupModel.findById(
                    user?.group ?? "",
                ).exec();
                logger.log(
                    `user in getUserWithUserNamePasswordMDB ${user?.userName}`,
                );
                return {...user?.toObject(), group: group?.toObject()} as IUser;
            } else {
                const user = await UserModel.findOne({
                    userName,
                    password,
                }).exec();
                const group = await GroupModel.findById(
                    user?.group ?? "",
                ).exec();
                logger.log(
                    `user in getUserWithUserNamePasswordMDB ${user?.userName}`,
                );
                return {...user?.toObject(), group: group?.toObject()} as IUser;
            }
        }
        return null;
    } catch (error) {
        logger.error(error);
        return null;
    }
};

// product category

export const getProductCategoriesMDB = async () => {
    try {
        const connection = await getConnection();
        if (connection.connection.readyState === 1) {
            const products = await ProductCategoryModel.find().exec();
            const groups = await GroupModel.find().exec();
            logger.log(
                `products in getProductCategoriesMDB ${JSON.stringify(
                    products,
                )}`,
            );
            logger.log(
                `groups in getProductCategoriesMDB ${JSON.stringify(groups)}`,
            );
            const result = products.map((product) => {
                const group = groups.find(
                    (g) => g.id.toString() === product.group,
                );
                return {
                    ...product?.toObject(),
                    group: group?.toObject(),
                } as IProductCategory;
            });
            return result;
        }
        return null;
    } catch (error) {
        logger.error(error);
        return null;
    }
};

export const getProductCategoryMDB = async (id: string) => {
    try {
        const connection = await getConnection();
        if (connection.connection.readyState === 1) {
            const product = await ProductCategoryModel.findById(id).exec();
            const group = await GroupModel.findById(
                product?.group ?? "",
            ).exec();
            return {
                ...product?.toObject(),
                group: group?.toObject(),
            } as IProductCategory;
        }
        return null;
    } catch (error) {
        logger.error(error);
        return null;
    }
};

export const createProductCategoryMDB = async (
    productCategory: IDBProductCategory,
) => {
    try {
        const connection = await getConnection();
        if (connection.connection.readyState === 1) {
            const newProduct = await ProductCategoryModel.create(
                productCategory,
            );
            const group = await GroupModel.findById(
                newProduct?.group ?? "",
            ).exec();
            return {
                ...newProduct?.toObject(),
                group: group?.toObject(),
            } as IProductCategory;
        }
        return null;
    } catch (error) {
        logger.error(error);
        return null;
    }
};

export const updateProductCategoryMDB = async (
    id: string,
    productCategory: Partial<IProductCategory>,
) => {
    try {
        const connection = await getConnection();
        if (connection.connection.readyState === 1) {
            const updatedProduct = await ProductCategoryModel.findOneAndUpdate(
                {_id: new Types.ObjectId(id)},
                {
                    ...productCategory,
                } as IProductCategory,
                {
                    new: true,
                },
            ).exec();
            const group = await GroupModel.findById(
                productCategory.group,
            ).exec();
            return {
                ...updatedProduct?.toObject(),
                group: group?.toObject(),
            } as IProductCategory;
        }
        return null;
    } catch (error) {
        logger.error(error);
        return null;
    }
};

export const deleteProductCategoryMDB = async (id: string) => {
    try {
        const connection = await getConnection();
        if (connection.connection.readyState === 1) {
            const deletedProduct = await ProductCategoryModel.findOneAndDelete({
                _id: new Types.ObjectId(id),
            }).exec();
            return deletedProduct?.toObject();
        }
        return null;
    } catch (error) {
        logger.error(error);
        return null;
    }
};

export const getProductCategoriesByGroupMDB = async (group: string) => {
    try {
        const connection = await getConnection();
        if (connection.connection.readyState === 1) {
            const products = await ProductCategoryModel.find({
                group: group,
            }).exec();
            const groups = await GroupModel.find().exec();
            const result = products.map((product) => {
                const group = groups.find((g) => g.id === product.group);
                return {
                    ...product?.toObject(),
                    group: group?.toObject(),
                } as IProductCategory;
            });
            return result;
        }
        return null;
    } catch (error) {
        logger.error(error);
        return null;
    }
};

// product transaction

export const getProductTransactionsMDB = async () => {
    try {
        const connection = await getConnection();
        if (connection.connection.readyState === 1) {
            const productTransactions =
                await ProductTransactionModel.find().exec();
            const users = await UserModel.find().exec();
            const groups = await GroupModel.find().exec();
            logger.log(
                `productTransactions in getProductTransactionsMDB ${JSON.stringify(
                    productTransactions,
                )}`,
            );
            const result = productTransactions.map((transaction) => {
                const user = users.find((u) => u.id === transaction.user);
                const group = groups.find((g) => g.id === user?.group);
                return {
                    ...transaction?.toObject(),
                    user: {
                        ...user?.toObject(),
                        group: group?.toObject(),
                    } as IUser,
                } as IProductTransaction;
            });
            return result;
        }
        return null;
    } catch (error) {
        logger.error(error);
        return null;
    }
};

export const getProductTransactionMDB = async (id: string) => {
    try {
        const connection = await getConnection();
        if (connection.connection.readyState === 1) {
            const productTransaction = await ProductTransactionModel.findById(
                id,
            ).exec();
            const user = await UserModel.findById(
                productTransaction?.user,
            ).exec();
            const group = await GroupModel.findById(user?.group).exec();
            return {
                ...productTransaction?.toObject(),
                user: {...user?.toObject(), group: group?.toObject()} as IUser,
            } as IProductTransaction;
        }
        return null;
    } catch (error) {
        logger.error(error);
        return null;
    }
};

export const createProductTransactionMDB = async (
    productTransaction: IDBProductTransaction,
) => {
    try {
        const connection = await getConnection();
        if (connection.connection.readyState === 1) {
            const newProductTransaction = await ProductTransactionModel.create(
                productTransaction,
            );
            const user = await UserModel.findById(
                newProductTransaction?.user ?? "",
            ).exec();
            const group = await GroupModel.findById(user?.group).exec();
            return {
                ...newProductTransaction?.toObject(),
                user: {...user?.toObject(), group: group?.toObject()} as IUser,
            } as IProductTransaction;
        }
        return null;
    } catch (error) {
        logger.error(error);
        return null;
    }
};

export const updateProductTransactionMDB = async (
    id: string,
    productTransaction: Partial<IDBProductTransaction>,
) => {
    try {
        const connection = await getConnection();
        if (connection.connection.readyState === 1) {
            const updatedProductTransaction =
                await ProductTransactionModel.findOneAndUpdate(
                    {_id: new Types.ObjectId(id)},
                    {
                        ...productTransaction,
                    },
                    {
                        new: true,
                    },
                ).exec();
            const user = await UserModel.findById(
                updatedProductTransaction?.user ?? "",
            ).exec();
            const group = await GroupModel.findById(user?.group).exec();
            return {
                ...updatedProductTransaction?.toObject(),
                user: {...user?.toObject(), group: group?.toObject()} as IUser,
            } as IProductTransaction;
        }
        return null;
    } catch (error) {
        logger.error(error);
        return null;
    }
};

export const deleteProductTransactionMDB = async (id: string) => {
    try {
        const connection = await getConnection();
        if (connection.connection.readyState === 1) {
            const deletedProductTransaction =
                await ProductTransactionModel.findOneAndDelete({
                    _id: new Types.ObjectId(id),
                }).exec();
            return deletedProductTransaction?.toObject();
        }
        return null;
    } catch (error) {
        logger.error(error);
        return null;
    }
};

export const getProductTransactionsByUserMDB = async (id: string) => {
    try {
        const connection = await getConnection();
        if (connection.connection.readyState === 1) {
            const productTransactions = await ProductTransactionModel.find({
                user: id,
            }).exec();
            const user = await UserModel.findById(id).exec();
            const group = await GroupModel.findById(user?.group).exec();
            const result = productTransactions.map((transaction) => {
                return {
                    ...transaction?.toObject(),
                    user: {
                        ...user?.toObject(),
                        group: group?.toObject(),
                    } as IUser,
                } as IProductTransaction;
            });
            logger.log(`product transactions mdb => ${JSON.stringify(productTransactions)} , ${id}`);
            return result;
        }
        return null;
    } catch (error) {
        logger.error(error);
        return null;
    }
};

export const getProductTransactionsByStatusMDB = async (
    status: ETransactionStatus,
) => {
    try {
        const connection = await getConnection();
        if (connection.connection.readyState === 1) {
            const productTransactions = await ProductTransactionModel.find({
                status,
            }).exec();
            const users = await UserModel.find().exec();
            const groups = await GroupModel.find().exec();
            const result = productTransactions.map((transaction) => {
                const user = users.find((u) => u.id === transaction.user);
                const group = groups.find((g) => g.id === user?.group);
                return {
                    ...transaction?.toObject(),
                    user: {
                        ...user?.toObject(),
                        group: group?.toObject(),
                    } as IUser,
                } as IProductTransaction;
            });
            return result;
        }
        return null;
    } catch (error) {
        logger.error(error);
        return null;
    }
};
