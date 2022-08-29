import {API_ROUTES} from "@/server/constants/routes";
import {IAPIResult, ILoginData} from "@/types/api";
import {ICreateUser, IUser, UnCertainData} from "@/types/data";
import {axios_instance} from "./axios";

export const handleLogin = async (loginData: ILoginData) => {
    try {
        const result = await axios_instance.post<
            IAPIResult<UnCertainData<IUser>>
        >(API_ROUTES.users.loginUser, loginData);
        return result.data;
    } catch (error) {
        console.log("error in login => ", error);
        const result: IAPIResult<UnCertainData<IUser>> = {
            data: null,
            ok: false,
            error: "Error logging in",
        };
        return result;
    }
};

export const handleRegister = async (registerData: ICreateUser) => {
    try {
        const result = await axios_instance.post<
            IAPIResult<UnCertainData<IUser>>
        >(API_ROUTES.users.registerUser, registerData);
        return result.data;
    } catch (error) {
        console.log("error in register => ", error);
        const result: IAPIResult<UnCertainData<IUser>> = {
            data: null,
            ok: false,
            error: "Error registering user",
        };
        return result;
    }
};
