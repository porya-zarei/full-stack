import {NextApiHandler} from "next";
import {logger} from "../utils/logger";
import {IAPIResult} from "@/types/api";
import {uploadFile} from "../utils/upload-helper";

export const uploadOrderFileHandler: NextApiHandler = async (req, res) => {
    try {
        const fileNames = await uploadFile(req);
        res.status(200).json({
            data: fileNames,
            ok: !!fileNames && fileNames?.length > 0,
            error: !fileNames ? "مشکلی در فرایند اپلود رخ داده است" : "",
        } as IAPIResult<string | null>);
    } catch (error) {
        logger.log(`error in upload file => ${error}`);
        res.status(400).json({
            data: null,
            ok: false,
            error: "خطا در دریافت فایل",
        } as IAPIResult<null>);
    }
};
