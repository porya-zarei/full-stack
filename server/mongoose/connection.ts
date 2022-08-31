import mongoose from "mongoose";
import {ATLAS_CONFIG} from "@/server/constants/atlas-config";

let connection: typeof mongoose | null = null;

export const getConnection = async () => {
    if (connection) {
        return connection;
    }
    connection = await mongoose.connect(ATLAS_CONFIG.uri, {
       appName: "space-omid-x",
    });
    return connection;
};
