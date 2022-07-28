import {IUser} from "@/types/data";
import {sign, verify} from "jsonwebtoken";
import {JWT_SECRET} from "../constants/configs";

export const getToken = (user?: IUser) => {
    const payload = {
        user,
        iat: new Date().getTime(),
        exp: new Date().getTime() + 1000 * 60 * 60 * 24 * 7,
    };
    return sign(payload, JWT_SECRET, {
        algorithm: "HS256",
    });
};

export const isTokenValid = (token: string) => {
    try {
        const decoded = verify(token, JWT_SECRET);
        return decoded;
    } catch (err) {
        return false;
    }
};
