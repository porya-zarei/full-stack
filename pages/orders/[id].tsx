import {useUserContext} from "@/contexts/user-context";
import {getOrder} from "@/services/orders";
import {IOrder} from "@/types/data";
import {autoLoginClient} from "@/utils/auth";
import {GetServerSideProps, NextPage} from "next";
import {useEffect} from "react";
import OrderRoute from "../../components/routes/orders/order";

interface OrderPageProps {
    order: IOrder | null;
}

const OrderPage: NextPage<OrderPageProps> = ({order}) => {
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
            <OrderRoute order={order} />
        </div>
    );
};

export default OrderPage;

export const getServerSideProps: GetServerSideProps = async ({
    req,
    res,
    query,
}) => {
    const orderId = query.id?.toString() ?? "";
    try {
        const result = await getOrder(orderId);
        if (result.ok) {
            return {
                props: {
                    order: result.data,
                },
            };
        }
        res.writeHead(302, {
            Location: "/orders",
        });
        res.end();
        return {
            props: {
                order: null,
            },
        };
    } catch (error) {
        res.writeHead(302, {
            Location: "/orders",
        });
        res.end();
        return {
            props: {
                order: null,
            },
        };
    }
};
