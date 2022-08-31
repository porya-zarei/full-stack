import {KavenegarApi} from "kavenegar";
import {KAVENEGAR_API} from "../constants/kavenegar";

export const smsApi = KavenegarApi({
    apikey: KAVENEGAR_API.key,
});
