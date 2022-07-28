import { useUserContext } from "@/contexts/user-context";
import { autoLoginClient } from "@/utils/auth";
import {NextPage} from "next";
import { useEffect } from "react";
import OrderRoute from "../../components/routes/orders/order";

interface OrderPageProps {}

const OrderPage: NextPage<OrderPageProps> = () => {
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
            <OrderRoute />
        </div>
    );
};

export default OrderPage;
