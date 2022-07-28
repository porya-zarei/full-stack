import {IUser} from "@/types/data";
import {decode} from "jsonwebtoken";

export const getTokenData = (token: string) => {
    try {
        const decoded = decode(token, {
            json: true,
        });
        const user = (decoded?.user ?? {}) as IUser;
        console.log("decoded token => ", decoded);
        return user;
    } catch (err) {
        console.log(err);
        return null;
    }
};

export const isTokenValid = (token: string) => {
    try {
        const decoded = decode(token, {
            json: true,
        });
        const user = (decoded?.user ?? {}) as IUser;
        console.log("decoded token => ", decoded);
        if (!!user && !!decoded?.exp && decoded.exp > Date.now() / 1000) {
            return token;
        }
        return null;
    } catch (err) {
        console.log(err);
        return null;
    }
};
