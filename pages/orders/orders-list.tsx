import {NextPage} from "next";
import OrdersListRoute from "@/components/routes/orders/orders-list";

interface OrdersListPageProps {}

const OrdersListPage: NextPage<OrdersListPageProps> = () => {
    return (
        <div className="w-full flex justify-start items-start">
            <OrdersListRoute />
        </div>
    );
};

export default OrdersListPage;
