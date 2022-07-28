import {API_ROUTES} from "@/server/constants/routes";
import {handleLogin} from "@/services/auth";
import {getTokenData, isTokenValid} from "./jwt-helper";

export const autoLoginServer = async (token: string) => {
    try {
        const tokenData = getTokenData(token);
        if (tokenData) {
            const {email, password} = tokenData;
            const result = await handleLogin({userName: email, password});
            if (result?.ok) {
                return result;
            }
        }
        return null;
    } catch (error) {
        console.log("error in login => ", error);
        return null;
    }
};

export const autoLoginClient = () => {
    const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
        "$1",
    );
    if (token && isTokenValid(token)) {
        const user = getTokenData(token);
        if (user) {
            return {user, token};
        }
    }
    return null;
};

export const clearUserData = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    localStorage.removeItem("token");
};
