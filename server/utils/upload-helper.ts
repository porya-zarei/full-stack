import {promises as fs} from "fs";
import formidable, {File} from "formidable";
import {UPLOAD_DIRECTORY} from "@/constants/upload";
import {NextApiRequest} from "next";
import {logger} from "../utils/logger";

type ProcessedFiles = Array<[string, File]>;

const getNewPath = (targetPath: string, file: File): [string, string] => {
    const newName = Date.now().toString() + "_" + file.originalFilename;
    return [`${targetPath}\\${newName}`, newName];
};

export const uploadFiles = async (req: NextApiRequest) => {
    try {
        const data = new Promise<ProcessedFiles | undefined>(
            (resolve, reject) => {
                const form = new formidable.IncomingForm({multiples: true});
                const files: ProcessedFiles = [];
                form.on("file", function (field, file) {
                    logger.log(
                        `in access files on file => ${field} ${file.originalFilename}`,
                    );
                    files.push([field, file]);
                });
                form.on("error", (err) => reject(err));
                form.on("end", () => {
                    resolve(files);
                });
                form.parse(req, () => {});
            },
        ).catch((e) => {
            logger.log(`error in access files => ${e}`);
        });
        const files = await data;
        const fileNames: string[] = [];
        if (files && files?.length) {
            const targetPath = UPLOAD_DIRECTORY;
            try {
                await fs.access(targetPath);
            } catch (e) {
                await fs.mkdir(targetPath);
            }

            for (const file of files) {
                const tempPath = file[1].filepath;
                const [newPath, newName] = getNewPath(targetPath, file[1]);
                fileNames.push(newName);
                logger.log(`in copy => ${newPath} , ${newName}`);
                await fs.copyFile(tempPath, newPath);
            }
            return fileNames;
        } else {
            return [];
        }
    } catch (error) {
        logger.log(`error in upload file => ${error}`);
        return null;
    }
};

export const uploadFile = async (req: NextApiRequest) => {
    try {
        const data = new Promise<ProcessedFiles | undefined>(
            (resolve, reject) => {
                const form = new formidable.IncomingForm({multiples: true});
                const files: ProcessedFiles = [];
                form.on("file", function (field, file) {
                    logger.log(
                        `in access files on file => ${field} ${file.originalFilename}`,
                    );
                    files.push([field, file]);
                });
                form.on("error", (err) => reject(err));
                form.on("end", () => {
                    resolve(files);
                });
                form.parse(req, () => {});
            },
        ).catch((e) => {
            logger.log(`error in access files => ${e}`);
        });
        const files = await data;
        const fileNames: string[] = [];
        if (files && files?.length) {
            const targetPath = UPLOAD_DIRECTORY;
            try {
                await fs.access(targetPath);
            } catch (e) {
                await fs.mkdir(targetPath);
            }
            for (const file of files) {
                const tempPath = file[1].filepath;
                const [newPath, newName] = getNewPath(targetPath, file[1]);
                fileNames.push(newName);
                logger.log(`in copy => ${tempPath} ${newPath} , ${newName}`);
                await fs.copyFile(tempPath, newPath);
            }
            return fileNames[0];
        } else {
            return null;
        }
    } catch (error) {
        logger.log(`error in upload file => ${error}`);
        return null;
    }
};
