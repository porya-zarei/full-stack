import {IAPIResult} from "@/types/api";
import {IAccessKey, ICreateAccessKey, UnCertainData} from "@/types/data";
import {
    createAccessKeyMDB,
    deleteAccessKeyMDB,
    getAccessKeyByKeyValueMDB,
    getAccessKeyMDB,
    getAccessKeysMDB,
    updateAccessKeyMDB,
} from "../mongoose/functions";

export const getAccessKeys = async () => {
    const accessKeys = await getAccessKeysMDB();
    const result: IAPIResult<UnCertainData<IAccessKey[]>> = {
        data: accessKeys,
        ok: !!accessKeys,
        error: "",
    };
    return result;
};

export const getAccessKey = async (id: string) => {
    const accessKey = await getAccessKeyMDB(id);
    const result: IAPIResult<UnCertainData<IAccessKey>> = {
        data: accessKey,
        ok: !!accessKey,
        error: "",
    };
    return result;
};

export const addAccessKey = async (data: ICreateAccessKey) => {
    const accessKey = await createAccessKeyMDB(data);
    const result: IAPIResult<UnCertainData<IAccessKey>> = {
        data: accessKey,
        ok: !!accessKey,
        error: "",
    };
    return result;
};

export const updateAccessKey = async (
    data: Partial<IAccessKey> & {_id: string},
) => {
    const updatedAccessKey = await updateAccessKeyMDB(data._id, data);
    const result: IAPIResult<UnCertainData<IAccessKey>> = {
        data: updatedAccessKey,
        ok: !!updatedAccessKey,
        error: "",
    };
    return result;
};

export const deleteAccessKey = async (id: string) => {
    const deletedAccessKey = await deleteAccessKeyMDB(id);
    const result: IAPIResult<UnCertainData<IAccessKey>> = {
        data: deletedAccessKey,
        ok: !!deletedAccessKey,
        error: "",
    };
    return result;
};

export const getAccessKeyByKeyValue = async (data: Omit<IAccessKey, "_id">) => {
    const accessKey = await getAccessKeyByKeyValueMDB(data);
    const result: IAPIResult<UnCertainData<IAccessKey>> = {
        data: accessKey,
        ok: !!accessKey,
        error: "",
    };
    return result;
};

export const isAccessKeyCorrect = async (data: Omit<IAccessKey, "_id">) => {
    const accessKey = await getAccessKeyByKeyValueMDB(data);
    return !!accessKey;
};
