import mongoose from "mongoose";
import {ATLAS_CONFIG} from "@/constants/atlas-config";

const MONGOOSE_URL = ATLAS_CONFIG.uri;

let connection: typeof mongoose | null = null;

export const getConnection = async () => {
    if (connection) {
        return connection;
    }
    connection = await mongoose.connect(MONGOOSE_URL, {
       appName: "space-omid-x",
    });
    return connection;
};
