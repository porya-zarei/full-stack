import {IDBOrder, IOrder, IUser} from "@/types/data";
import {Types} from "mongoose";
import {logger} from "../utils/logger";
import {getConnection} from "./connection";
import {OrderModel, UserModel} from "./models";

export const getUsersMDB = async () => {
    try {
        const connection = await getConnection();
        if (connection) {
            const users = await UserModel.find().exec();
            return users;
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
            return orders;
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
            return user;
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
            return order;
        }
        return null;
    } catch (error) {
        logger.error(error);
        return null;
    }
};

export const createUserMDB = async (user: IUser) => {
    try {
        const connection = await getConnection();
        if (connection.connection.readyState === 1) {
            const newUser = await UserModel.create(user);
            return newUser;
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
            return newOrder;
        }
        return null;
    } catch (error) {
        logger.error(error);
        return null;
    }
};
export const updateUserMDB = async (id: string, user: Partial<IUser>) => {
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
            logger.log(`updatedUser: ${JSON.stringify(updatedUser)}`);
            return updatedUser;
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
            return updatedOrder;
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
            return deletedUser;
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
            return deletedOrder;
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
                logger.log(
                    `user in getUserWithUserNamePasswordMDB ${user?.userName}`,
                );

                return user;
            } else {
                const user = await UserModel.findOne({
                    userName,
                    password,
                }).exec();

                return user;
            }
        }
        return null;
    } catch (error) {
        logger.error(error);
        return null;
    }
};
