import {NextPage} from "next";
import OrdersRoute from "@/components/routes/orders";

interface OrdersPageProps {}

const OrdersPage: NextPage<OrdersPageProps> = () => {
    return (
        <div className="w-full flex justify-start items-start">
            <OrdersRoute />
        </div>
    );
};

export default OrdersPage;
