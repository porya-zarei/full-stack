import {NextPage} from "next";
import OrderRoute from "../../components/routes/orders/order";

interface OrderPageProps {}

const OrderPage: NextPage<OrderPageProps> = () => {
    return (
        <div className="w-full flex justify-start items-start">
            <OrderRoute />
        </div>
    );
};

export default OrderPage;
