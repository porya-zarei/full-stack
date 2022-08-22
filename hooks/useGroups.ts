import {getGroups} from "@/services/groups";
import {IGroup} from "@/types/data";
import {Dispatch, SetStateAction, useEffect, useState} from "react";

export const useGroups = () => {
    const [groups, setGroups] = useState<IGroup[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const changeGroups: Dispatch<SetStateAction<IGroup[]>> = (value) => {
        setGroups(value);
    };

    const getGroupsHandler = async () => {
        setLoading(true);
        try {
            const result = await getGroups();
            if (result.ok && result.data) {
                setGroups(result.data);
            }
        } catch (error) {
            setError(`error in get groups => ${error}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
       groups.length === 0 && getGroupsHandler();
    }, []);

    return {groups, loading, error, refetch: getGroupsHandler, changeGroups};
};
