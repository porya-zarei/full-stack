import {useUserContext} from "@/contexts/user-context";
import {useOrder} from "@/hooks/useOrder";
import {getOrder} from "@/services/orders";
import {IOrder} from "@/types/data";
import {autoLoginClient} from "@/utils/auth";
import {GetServerSideProps, NextPage} from "next";
import {useEffect} from "react";
import OrderRoute from "../../components/routes/orders/order";

interface OrderPageProps {
    order: IOrder | null;
    id: string;
}

const OrderPage: NextPage<OrderPageProps> = ({id}) => {
    const {changeToken, changeUser, isUserLoggedIn} = useUserContext();
    const {order, loading, error} = useOrder(id);
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
            <OrderRoute loading={loading} error={error} orderData={order} />
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
    console.log("order-id:", orderId);
    try {
        if (orderId.length > 0) {
            return {
                props: {
                    id: orderId,
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
                id: "",
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
                id: "",
            },
        };
    }
};

// export const getServerSideProps: GetServerSideProps = async ({
//     req,
//     res,
//     query,
// }) => {
//     const orderId = query.id?.toString() ?? "";
//     console.log("order-id:",orderId);
//     try {
//         const result = await getOrder(orderId);
//         if (result.ok) {
//             return {
//                 props: {
//                     order: result.data,
//                 },
//             };
//         }
//         res.writeHead(302, {
//             Location: "/orders",
//         });
//         res.end();
//         return {
//             props: {
//                 order: null,
//             },
//         };
//     } catch (error) {
//         res.writeHead(302, {
//             Location: "/orders",
//         });
//         res.end();
//         return {
//             props: {
//                 order: null,
//             },
//         };
//     }
// };
