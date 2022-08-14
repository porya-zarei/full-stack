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
            // connection.disconnect();
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
            // connection.disconnect();
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
            // connection.disconnect();
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
            // connection.disconnect();
            // connection.disconnect();
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
            // connection.disconnect();
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
            const updatedUser = await UserModel.findByIdAndUpdate(
                {_id: new Types.ObjectId(id)},
                {...user},
                {
                    new: true,
                },
            ).exec();
            // connection.disconnect();
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
            const updatedOrder = await OrderModel.findByIdAndUpdate(
                {_id: new Types.ObjectId(id)},
                {...order},
                {
                    new: true,
                },
            ).exec();
            // connection.disconnect();
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
            const deletedUser = await UserModel.findByIdAndDelete({
                _id: new Types.ObjectId(id),
            }).exec();
            // connection.disconnect();
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
            const deletedOrder = await OrderModel.findByIdAndDelete({
                _id: new Types.ObjectId(id),
            }).exec();
            // connection.disconnect();
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
                // connection.disconnect();
                return user;
            } else {
                const user = await UserModel.findOne({
                    userName,
                    password,
                }).exec();
                // connection.disconnect();
                return user;
            }
        }
        return null;
    } catch (error) {
        logger.error(error);
        return null;
    }
};
