import OrdersAnalytictsRoute from "@/components/routes/orders/orders-analytics";
import {FC} from "react";

interface OrdersAnalyticsPageProps {}

const OrdersAnalyticsPage: FC<OrdersAnalyticsPageProps> = () => {
    return (
        <div className="w-full flex justify-start items-start">
            <OrdersAnalytictsRoute />
        </div>
    );
};

export default OrdersAnalyticsPage;
