import ManageGroupsRoute from "@/components/routes/groups/manage-groups";
import {FC} from "react";

interface ManageGroupsPageProps {}

const ManageGroupsPage: FC<ManageGroupsPageProps> = () => {
    return (
        <div className="w-full flex justify-center items-center">
            <ManageGroupsRoute />
        </div>
    );
};

export default ManageGroupsPage;
