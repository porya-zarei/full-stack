import {FC, useEffect} from "react";
import AddOrderRoute from "@/components/routes/orders/add-order";
import { useUserContext } from "@/contexts/user-context";
import { autoLoginClient } from "@/utils/auth";
import { GetServerSideProps } from "next";

interface AddOrderPageProps {}

const AddOrderPage: FC<AddOrderPageProps> = () => {
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
        <div className="w-full flex justify-start items-start">
            <AddOrderRoute />
        </div>
    );
};

export default AddOrderPage;

export const getServerSideProps:GetServerSideProps = async () => {
    return {
        props: {}
    }
}