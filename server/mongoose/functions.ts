import {
    IDBOrder,
    IDBProductCategory,
    IDBUser,
    IGroup,
    IProductCategory,
    IUser,
} from "@/types/data";
import {Types} from "mongoose";
import {logger} from "../utils/logger";
import {getConnection} from "./connection";
import {
    GroupModel,
    OrderModel,
    ProductCategoryModel,
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

export const updateOrderMDB = async (id: string, order: IDBOrder) => {
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
