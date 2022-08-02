import {NextPageWithLayout} from "@/types/pages";
import LoginRoute from "@/components/routes/auth/login";
import {ReactNode} from "react";
import { GetServerSideProps } from "next";

interface LoginPageProps {}

const LoginPage: NextPageWithLayout<LoginPageProps> = () => {
    return (
        <div className="w-full flex items-center justify-center">
            <LoginRoute />
        </div>
    );
};

LoginPage.getLayout = (page: ReactNode) => <div>{page}</div>;

export default LoginPage;

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {},
    };
};
