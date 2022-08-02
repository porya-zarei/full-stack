import {NextPageWithLayout} from "@/types/pages";
import RegisterRoute from "@/components/routes/auth/register";
import { ReactNode } from "react";
import { GetServerSideProps } from "next";

interface RegisterPageProps {}

const RegisterPage: NextPageWithLayout<RegisterPageProps> = () => {
    return (
        <div className="w-full min-h-screen h-full flex items-center justify-center">
            <RegisterRoute />
        </div>
    );
};

RegisterPage.getLayout = (page: ReactNode) => <div>{page}</div>;

export default RegisterPage;

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {},
    };
};