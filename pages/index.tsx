import type {GetServerSideProps, NextPage} from "next";
import HomeRoute from "@/components/routes/home";
import {useUserContext} from "@/contexts/user-context";
import {useEffect} from "react";
import {autoLoginClient} from "@/utils/auth";

interface HomePageProps {}

const HomePage: NextPage<HomePageProps> = () => {
    const {changeToken, changeUser, isUserLoggedIn} = useUserContext();
    useEffect(() => {
        if (!isUserLoggedIn()) {
            const result = autoLoginClient();
            if (result) {
                changeToken(result.token);
                changeUser(result.user);
            }
        }
    }, []);
    return (
        <div className="w-full flex justify-center items-center">
            <HomeRoute />
        </div>
    );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
    return {
        props: {},
    };
};
