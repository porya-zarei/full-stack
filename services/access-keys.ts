import {API_ROUTES} from "@/server/constants/routes";
import {IAPIResult} from "@/types/api";
import {IAccessKey, ICreateAccessKey, UnCertainData} from "@/types/data";
import {axios_instance} from "./axios";

export const getAccessKeys = async () => {
    try {
        const result = await axios_instance.post<
            IAPIResult<UnCertainData<IAccessKey[]>>
        >(API_ROUTES.accessKeys.getAllAccessKeys);
        return result.data;
    } catch (error) {
        console.log("error in get access keys => ", error);
        const result: IAPIResult<null> = {
            data: null,
            ok: false,
            error: "خطا در دریافت کلید های دسترسی",
        };
        return result;
    }
};

export const getAccessKey = async (id: string) => {
    try {
        const result = await axios_instance.post<
            IAPIResult<UnCertainData<IAccessKey>>
        >(API_ROUTES.accessKeys.getAccessKey, {id});
        return result.data;
    } catch (error) {
        console.log("error in get access key => ", error);
        const result: IAPIResult<null> = {
            data: null,
            ok: false,
            error: "خطا در دریافت کلید دسترسی",
        };
        return result;
    }
};

export const addAccessKey = async (data: ICreateAccessKey) => {
    try {
        const result = await axios_instance.post<
            IAPIResult<UnCertainData<IAccessKey>>
        >(API_ROUTES.accessKeys.addAccessKey, data);
        return result.data;
    } catch (error) {
        console.log("error in add access key => ", error);
        const result: IAPIResult<null> = {
            data: null,
            ok: false,
            error: "خطا در افزودن کلید دسترسی",
        };
        return result;
    }
};

export const updateAccessKey = async (
    data: Partial<Omit<IAccessKey, "_id">>,
) => {
    try {
        const result = await axios_instance.post<
            IAPIResult<UnCertainData<IAccessKey>>
        >(API_ROUTES.accessKeys.updateAccessKey, data);
        return result.data;
    } catch (error) {
        console.log("error in update access key => ", error);
        const result: IAPIResult<null> = {
            data: null,
            ok: false,
            error: "خطا در اپدیت کلید دسترسی",
        };
        return result;
    }
};

export const deleteAccessKey = async (id: string) => {
    try {
        const result = await axios_instance.post<
            IAPIResult<UnCertainData<IAccessKey>>
        >(API_ROUTES.accessKeys.deleteAccessKey, {id});
        return result.data;
    } catch (error) {
        console.log("error in delete access key => ", error);
        const result: IAPIResult<null> = {
            data: null,
            ok: false,
            error: "خطا در حذف کلید دسترسی",
        };
        return result;
    }
};
