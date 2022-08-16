import GroupsRoute from "@/components/routes/groups";
import {FC} from "react";

interface GroupsPageProps {}

const GroupsPage: FC<GroupsPageProps> = () => {
    return (
        <div className="w-full flex justify-center items-center">
            <GroupsRoute />
        </div>
    );
};

export default GroupsPage;
