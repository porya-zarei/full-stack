import {FC, MouseEvent} from "react";
import FrameContainer from "@/components/core/containers/frame-container";
import RouteContainer from "@/components/core/containers/route-container";
import {useUserContext} from "@/contexts/user-context";
import {useRouter} from "next/router";
import {useOrders} from "@/hooks/useOrders";
import Card from "@/components/core/card";
import {updateOrderStatus} from "@/services/orders";
import {ERole, ESTATUS_NAMES, IOrder} from "@/types/data";
import useNotification from "@/hooks/useNotification";
import Loading from "@/components/core/loadings";

interface OrdersRouteProps {}

const OrdersRoute: FC<OrdersRouteProps> = () => {
    const {user} = useUserContext();
    const router = useRouter();
    const {orders, error, loading, refetch} = useOrders(user?.id,"all");
    const {notify} = useNotification();
    const handleUpdateStatus =
        (confirmed: boolean, order: IOrder) =>
        async (e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            const result = await updateOrderStatus(order.id, confirmed);
            if (result.ok && result?.data && result?.data?.status) {
                await refetch();
                notify("Order status updated", {
                    type: "success",
                });
            } else {
                notify("Error updating order status", {
                    type: "error",
                });
            }
        };
    return (
        <RouteContainer>
            <FrameContainer className="m-2 md:m-4 border-primary">
                <div className="w-full flex items-start justify-center flex-wrap p-3">
                    <div className="w-full flex justify-center items-center md:justify-start md:items-start mb-4 my-2">
                        <h3 className="text-base md:text-2xl text-center pb-2 border-b-2 border-solid border-secondary">
                            لیست سفارشات مرتبط با شما
                        </h3>
                    </div>
                    <div className="w-full flex items-center justify-evenly content-center py-3 flex-wrap">
                        {!loading && orders?.length > 0 ? (
                            orders.map((order) => (
                                <div
                                    key={order.id}
                                    className="w-12/12 md:w-4/12 h-72 max-h-72 flex items-center justify-center m-1">
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
                                                            ) *
                                                                product.count,
                                                        0,
                                                    )
                                                    .toLocaleString("en-US"),
                                                label: "مجموع هزینه ها",
                                            },
                                            {
                                                value: order.products
                                                    ?.reduce?.(
                                                        (acc, product) =>
                                                            acc +
                                                            Number(
                                                                product.count,
                                                            ),
                                                        0,
                                                    )
                                                    .toString(),
                                                label: "تعداد محصولات",
                                            },
                                        ]}
                                        title={order.user.fullName}
                                        titleContainerClassName="bg-white border-y-2 border-solid border-primary py-1 sticky top-0 z-10"
                                        badge={order.user.email}
                                        status={ESTATUS_NAMES[Number(order.status)]}
                                        primaryContainerClassName="rounded-xl overflow-hidden shadow-around transition-all hover:scale-105 cursor-pointer"
                                        secondaryContainerClassName="h-full bg-white relative overflow-y-auto custom-scrollbar"
                                        contentClassName="px-3 py-2 text-center"
                                        renderFooter={user.role !== ERole.USER}
                                        dangerBtnText="برگشت"
                                        btnsContainerClassName="sticky bottom-0 z-10 bg-white"
                                        dangerBtnClassName="bg-white hover:bg-warning hover:text-white transition-all border-2 border-warning text-warning font-bold py-2 px-4 rounded-md"
                                        onDangerBtnClick={handleUpdateStatus(
                                            false,
                                            order,
                                        )}
                                        successBtnText="تایید"
                                        successBtnClassName="bg-white hover:bg-info  hover:text-white transition-all border-2 border-info text-info font-bold py-2 px-4 rounded-md"
                                        onSuccessBtnClick={handleUpdateStatus(
                                            true,
                                            order,
                                        )}
                                        dataClassName="border-b-2 border-solid border-gray-light rounded-md m-1"
                                        onClick={() => {
                                            router.push(`/orders/${order.id}`);
                                        }}
                                    />
                                </div>
                            ))
                        ) : (
                            <Loading/>
                        )}
                    </div>
                </div>
            </FrameContainer>
        </RouteContainer>
    );
};

export default OrdersRoute;
