import {IAPIResult} from "@/types/api";
import {ICreateGroup, IGroup, UnCertainData} from "@/types/data";
import {Types} from "mongoose";
import {
    createGroupMDB,
    deleteGroupLimitYearMDB,
    deleteGroupMDB,
    getGroupMDB,
    getGroupsMDB,
    updateGroupMDB,
} from "../mongoose/functions";

export const getAllGroups = async () => {
    const groups = await getGroupsMDB();
    const result: IAPIResult<UnCertainData<IGroup[]>> = {
        data: groups,
        ok: !!groups,
        error: "",
    };
    return result;
};

export const getGroup = async (id: string) => {
    const group = await getGroupMDB(id);
    const result: IAPIResult<UnCertainData<IGroup>> = {
        data: group,
        ok: !!group,
        error: "",
    };
    return result;
};

export const createGroup = async (groupData: ICreateGroup) => {
    const id = new Types.ObjectId().toString();
    const group: IGroup = {
        ...groupData,
        id: id,
        _id: id,
    };
    const createdGroup = await createGroupMDB(group);
    const result: IAPIResult<UnCertainData<IGroup>> = {
        data: createdGroup,
        ok: !!createdGroup,
        error: "",
    };
    return result;
};

export const updateGroup = async (
    groupData: Partial<ICreateGroup> & {id: string},
) => {
    const updatedGroup = await updateGroupMDB(groupData.id, groupData);
    const result: IAPIResult<UnCertainData<IGroup>> = {
        data: updatedGroup,
        ok: !!updatedGroup,
        error: "",
    };
    return result;
};

export const deleteGroup = async (id: string) => {
    const deletedGroup = await deleteGroupMDB(id);
    const result: IAPIResult<UnCertainData<IGroup>> = {
        data: deletedGroup,
        ok: !!deletedGroup,
        error: "",
    };
    return result;
};

export const deleteGroupLimitYear = async (groupId: string,yearLimitId:string) => {
    const updatedGroup = await deleteGroupLimitYearMDB(groupId,yearLimitId);
    const result: IAPIResult<UnCertainData<IGroup>> = {
        data: updatedGroup,
        ok: !!updatedGroup,
        error: "",
    };
    return result;
};