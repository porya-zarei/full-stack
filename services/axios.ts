import {API_BASE_URL} from "@/constants/api";
import axios from "axios";

export const axios_instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
