import {NextPage} from "next";
import OrdersRoute from "@/components/routes/orders";
import { useUserContext } from "@/contexts/user-context";
import { useEffect } from "react";
import { autoLoginClient } from "@/utils/auth";

interface OrdersPageProps {}

const OrdersPage: NextPage<OrdersPageProps> = () => {
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
            <OrdersRoute />
        </div>
    );
};

export default OrdersPage;
