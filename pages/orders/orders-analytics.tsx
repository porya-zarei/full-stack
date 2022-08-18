import OrdersAnalytictsRoute from "@/components/routes/orders/orders-analytics";
import { GetServerSideProps, NextPage } from "next";

interface OrdersAnalyticsPageProps {}

const OrdersAnalyticsPage: NextPage<OrdersAnalyticsPageProps> = () => {
    return (
        <div className="w-full flex justify-start items-start">
            <OrdersAnalytictsRoute />
        </div>
    );
};

export default OrdersAnalyticsPage;

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {},
    };
};