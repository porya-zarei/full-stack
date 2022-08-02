import ChangeUsersRoute from "@/components/routes/users/change-users";
import { GetServerSideProps } from "next";
import { FC } from "react";

interface ChangeUsersPageProps {
    
}
 
const ChangeUsersPage: FC<ChangeUsersPageProps> = () => {
    return ( 
        <div className="w-full flex justify-start items-start">
            <ChangeUsersRoute/>
        </div>
     );
}
 
export default ChangeUsersPage;

export const getServerSideProps:GetServerSideProps = async () => {
    return {
        props: {}
    }
}