import UsersRoute from "@/components/routes/users";
import { FC } from "react";

interface EditRoleUserPageProps {
    
}
 
const EditRoleUserPage: FC<EditRoleUserPageProps> = () => {
    return ( 
        <div className="w-full flex justify-start items-start">
            <UsersRoute/>
        </div>
     );
}
 
export default EditRoleUserPage;