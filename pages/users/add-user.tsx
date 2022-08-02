import AddUserRoute from "@/components/routes/users/add-user";
import { GetServerSideProps } from "next";
import {FC} from "react";

interface AddUserPageProps {}

const AddUserPage: FC<AddUserPageProps> = () => {
    return (
        <div className="w-full flex justify-center items-center">
            <AddUserRoute />
        </div>
    );
};

export default AddUserPage;

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {},
    };
};