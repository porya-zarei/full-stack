import UsersRoute from "@/components/routes/users";
import { GetServerSideProps } from "next";
import { FC } from "react";

interface UsersPageProps {
    
}
 
const UsersPage: FC<UsersPageProps> = () => {
    return ( 
        <div className="w-full flex justify-center items-center">
            <UsersRoute />
        </div>
     );
}
 
export default UsersPage;

export const getServerSideProps:GetServerSideProps = async () => {
    return {
        props: {}
    }
}