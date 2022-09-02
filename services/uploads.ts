import {API_ROUTES} from "@/server/constants/routes";
import {IAPIResult} from "@/types/api";
import {UnCertainData} from "@/types/data";
import {axios_instance} from "./axios";

export const uploadFile = async (file: File) => {
    try {
        const data = new FormData();
        data.append("file", file);
        const result = await axios_instance.post<
            IAPIResult<UnCertainData<string>>
        >(API_ROUTES.uploads.uploadOrderFile, data);
        return result.data;
    } catch (error) {
        return {
            data: null,
            ok: false,
            error: "مشکلی رخ داده است",
        } as IAPIResult<null>;
    }
};
