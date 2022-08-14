import {ERole, IUser} from "@/types/data";
import {sign, verify} from "jsonwebtoken";
import { NextApiRequest } from "next";
import { getUser } from "../actions/users";
import {JWT_SECRET} from "../constants/configs";
import { logger } from "./logger";

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

export const getUserFromToken = async (token: string) => {
    const decoded = isTokenValid(token);
    if (decoded && typeof decoded === "object") {
        return (await getUser(decoded?.user?.id)).data;
    }
    return null;
};

export const getUserRoleFromToken = (token: string) => {
    const decoded = isTokenValid(token);
    if (decoded && typeof decoded === "object") {
        return decoded?.user.role as ERole;
    }
    return null;
};

export const getTokenFromRequest = (req: NextApiRequest) => {
    const {cookies} = req;
    console.log(cookies);
    if (cookies && cookies.token) {
        return cookies.token;
    }
    return null;
}