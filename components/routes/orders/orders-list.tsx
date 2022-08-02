import Card from "@/components/core/card";
import FrameContainer from "@/components/core/containers/frame-container";
import RouteContainer from "@/components/core/containers/route-container";
import {useUserContext} from "@/contexts/user-context";
import {useOrders} from "@/hooks/useOrders";
import {IOrder} from "@/types/data";
import {useRouter} from "next/router";
import {FC} from "react";

interface OrdersListRouteProps {}

const OrdersListRoute: FC<OrdersListRouteProps> = () => {
    const {user} = useUserContext();
    const router = useRouter();
    const {orders, error, loading} = useOrders(user.id, "pending");
    return (
        <RouteContainer>
            <FrameContainer className="m-4 border-primary">
                <div className="w-full flex items-start justify-center flex-wrap p-3">
                    <div className="w-full flex justify-start items-start mb-4 my-2">
                        <h3 className="text-2xl text-center pb-2 border-b-2 border-solid border-secondary">
                            لیست سفارشات مرتبط با شما
                        </h3>
                    </div>
                    <div className="w-full flex items-center justify-evenly content-center py-3 flex-wrap">
                        {!loading &&
                            orders?.length > 0 &&
                            orders.map((order) => (
                                <div
                                    key={order.id}
                                    className="w-10/12 md:w-4/12 h-72 max-h-72 flex items-center justify-center m-1">
                                    <Card
                                        content={order.description}
                                        data={[
                                            {
                                                value: order.products
                                                    .reduce(
                                                        (acc, product) =>
                                                            acc +
                                                            Number(
                                                                product.price,
                                                            ) * product.count,
                                                        0,
                                                    )
                                                    .toString(),
                                                label: "مجموع هزینه ها",
                                            },
                                            {
                                                value: order.products.length.toString(),
                                                label: "تعداد محصولات",
                                            },
                                        ]}
                                        title={order.user.fullName}
                                        titleContainerClassName="bg-white border-y-2 border-solid border-primary py-1 sticky top-0 z-10"
                                        badge={order.user.email}
                                        primaryContainerClassName="rounded-xl overflow-hidden shadow-around transition-all hover:scale-105 cursor-pointer"
                                        secondaryContainerClassName="h-full bg-white relative overflow-y-auto custom-scrollbar"
                                        contentClassName="px-3 py-2 text-center"
                                        dangerBtnText="برگشت"
                                        btnsContainerClassName="sticky bottom-0 z-10 bg-white"
                                        dangerBtnClassName="bg-white hover:bg-warning hover:text-white transition-all border-2 border-warning text-warning font-bold py-2 px-4 rounded-md"
                                        onDangerBtnClick={(e) => {
                                            e.stopPropagation();
                                            console.log("delete");
                                        }}
                                        successBtnText="تایید"
                                        successBtnClassName="bg-white hover:bg-info  hover:text-white transition-all border-2 border-info text-info font-bold py-2 px-4 rounded-md"
                                        onSuccessBtnClick={(e) => {
                                            e.stopPropagation();
                                            console.log("success");
                                        }}
                                        dataClassName="border-b-2 border-solid border-gray-light rounded-md m-1"
                                        onClick={() => {
                                            router.push(`/orders/${order.id}`);
                                        }}
                                    />
                                </div>
                            ))}
                    </div>
                </div>
            </FrameContainer>
        </RouteContainer>
    );
};

export default OrdersListRoute;
