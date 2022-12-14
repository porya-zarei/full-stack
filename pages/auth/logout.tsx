import LogoutRoute from "@/components/routes/auth/logout";
import {NextPageWithLayout} from "@/types/pages";
import { GetServerSideProps } from "next";
import {ReactNode} from "react";

interface LogoutPageProps {}

const LogoutPage: NextPageWithLayout<LogoutPageProps> = () => {
    return (
        <div className="w-full flex items-center justify-center">
            <LogoutRoute />
        </div>
    );
};

LogoutPage.getLayout = (page: ReactNode) => <div>{page}</div>;

export default LogoutPage;

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {},
    };
};