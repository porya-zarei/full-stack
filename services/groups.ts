import {API_ROUTES} from "@/server/constants/routes";
import {IAPIResult} from "@/types/api";
import {ICreateGroup, IGroup} from "@/types/data";
import {axios_instance} from "./axios";

export const getGroups = async () => {
    try {
        const result = await axios_instance.post<IAPIResult<IGroup[]>>(
            API_ROUTES.groups.getAllGroups,
        );
        return result.data;
    } catch (error) {
        console.log("error in get groups => ", error);
        const result: IAPIResult<IGroup[]> = {
            data: [],
            error: "error in get users",
            ok: false,
        };
        return result;
    }
};

export const getGroup = async (id: string) => {
    try {
        const result = await axios_instance.post<IAPIResult<IGroup>>(
            API_ROUTES.groups.getGroup,
            {id},
        );
        return result.data;
    } catch (error) {
        console.log("error in get group => ", error);
        const result: IAPIResult<IGroup | null> = {
            data: null,
            error: "error in get group",
            ok: false,
        };
        return result;
    }
};

export const addGroup = async (group: ICreateGroup) => {
    try {
        const result = await axios_instance.post<IAPIResult<IGroup>>(
            API_ROUTES.groups.addGroup,
            group,
        );
        return result.data;
    } catch (error) {
        console.log("error in add group => ", error);
        const result: IAPIResult<IGroup | null> = {
            data: null,
            error: "error in add group",
            ok: false,
        };
        return result;
    }
};

export const updateGroup = async (group: Partial<IGroup>) => {
    try {
        const result = await axios_instance.post<IAPIResult<IGroup>>(
            API_ROUTES.groups.updateGroup,
            group,
        );
        return result.data;
    } catch (error) {
        console.log("error in update group => ", error);
        const result: IAPIResult<IGroup | null> = {
            data: null,
            error: "error in update group",
            ok: false,
        };
        return result;
    }
};

export const deleteGroup = async (id: string) => {
    try {
        const result = await axios_instance.post<IAPIResult<string>>(
            API_ROUTES.groups.deleteGroup,
            {id},
        );
        return result.data;
    } catch (error) {
        console.log("error in delete group => ", error);
        const result: IAPIResult<IGroup | null> = {
            data: null,
            error: "error in delete group",
            ok: false,
        };
        return result;
    }
};

export const deleteGroupLimitYear = async (
    groupId: string,
    yearLimitId: string,
) => {
    try {
        const result = await axios_instance.post<IAPIResult<string>>(
            API_ROUTES.groups.deleteGroupLimitYear,
            {groupId, yearLimitId},
        );
        return result.data;
    } catch (error) {
        console.log("error in delete group => ", error);
        const result: IAPIResult<IGroup | null> = {
            data: null,
            error: "error in delete group",
            ok: false,
        };
        return result;
    }
};

export const checkMoneyLimit = async (id: string, money: string) => {
    try {
        const result = await axios_instance.post<IAPIResult<boolean>>(
            API_ROUTES.groups.checkGroupMoneyLimit,
            {id, money},
        );
        return result.data;
    } catch (error) {
        console.log("error in check group money limit => ", error);
        const result: IAPIResult<boolean> = {
            data: false,
            error: "error in check group money limit",
            ok: false,
        };
        return result;
    }
};
