import {NextPage} from "next";
import OrdersListRoute from "@/components/routes/orders/orders-list";
import {useUserContext} from "@/contexts/user-context";
import {useEffect} from "react";
import {autoLoginClient} from "@/utils/auth";

interface OrdersListPageProps {}

const OrdersListPage: NextPage<OrdersListPageProps> = () => {
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
            <OrdersListRoute />
        </div>
    );
};

export default OrdersListPage;
