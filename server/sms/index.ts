import {KAVENEGAR_API} from "../constants/kavenegar";
import {logger} from "../utils/logger";
import {smsApi} from "./connection";

const getFullSmsText = (text: string, name: string) => {
    return `سلام ${name}\n-----------------------------\n${text}\n-----------------------------`;
};

export const sendSms = (
    text: string,
    name: string,
    phoneNumber: string,
    callback: (
        entries: {
            messageid: number;
            message: string;
            status: number;
            statustext: string;
            sender: string;
            receptor: string;
            date: number;
            cost: number;
        }[],
        status: number,
        message: string,
    ) => void,
) => {
    logger.log(`in send sms => ${name},${phoneNumber}`);
    smsApi.Send(
        {
            message: getFullSmsText(text, name),
            receptor: `${phoneNumber}`,
            sender: KAVENEGAR_API.sender,
        },
        callback,
    );
};
