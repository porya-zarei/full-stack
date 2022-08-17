import {IGroup} from "@/types/data";
import {Types} from "mongoose";
import {logger} from "../utils/logger";
import {createGroupMDB, getGroupsMDB} from "./functions";

export const seedDatabaseGroup = async () => {
    const groups = await getGroupsMDB();
    if (groups && groups.length) {
        return groups[0];
    } else {
        const groupId = new Types.ObjectId().toString();
        const defaultGroup: IGroup = {
            name: "مالی",
            moneyLimitYears: [],
            id: groupId,
            _id: groupId,
        };
        const group = await createGroupMDB(defaultGroup);
        return group;
    }
};

export const seedDatabase = async () => {
    const group = await seedDatabaseGroup();
    logger.log(`seed db group => ${JSON.stringify(group)}`);
};
