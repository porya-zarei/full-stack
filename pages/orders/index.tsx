import {GetServerSideProps, NextPage} from "next";
import OrdersRoute from "@/components/routes/orders";
import { useUserContext } from "@/contexts/user-context";
import { useEffect } from "react";
import { autoLoginClient } from "@/utils/auth";

interface OrdersPageProps {}

const OrdersPage: NextPage<OrdersPageProps> = () => {
    return (
        <div className="w-full flex justify-start items-start">
            <OrdersRoute />
        </div>
    );
};

export default OrdersPage;

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {},
    };
};