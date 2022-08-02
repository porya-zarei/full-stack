import FrameContainer from "@/components/core/containers/frame-container";
import RouteContainer from "@/components/core/containers/route-container";
import {FC, useState} from "react";
import {ERole, IOrder} from "@/types/data";
import Order from "@/components/core/order";
import Image from "next/image";
import IMAGES from "@/constants/images";
import {updateOrderStatus} from "@/services/orders";
import useNotification from "@/hooks/useNotification";
import {useUserContext} from "@/contexts/user-context";

interface OrderRouteProps {
    orderData: IOrder | null;
}

const OrderRoute: FC<OrderRouteProps> = ({orderData}) => {
    const [order, setOrder] = useState<IOrder>(orderData ?? ({} as IOrder));
    const {user} = useUserContext();
    const {notify} = useNotification();
    const handleUpdateStatus = (confirmed: boolean) => async () => {
        const result = await updateOrderStatus(order.id, confirmed);
        if (result.ok && result?.data && result?.data?.status) {
            setOrder({...order, status: result.data.status});
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
            <FrameContainer className="min-h-[82vh] m-4 border-primary">
                <div className="w-full flex justify-center items-center flex-wrap">
                    <div className="w-full md:w-1/3 order-2 md:order-1">
                        {order && (
                            <Order
                                order={order}
                                handleCancel={handleUpdateStatus(false)}
                                handleConfirm={handleUpdateStatus(true)}
                                renderFooter={user.role !== ERole.USER}
                            />
                        )}
                    </div>
                    <div className="w-full md:w-1/3 p-2 md:p-0">
                        <Image
                            src={IMAGES.orderImage}
                            alt="order"
                            width={300}
                            height={300}
                            className="rounded-xl order-1 md:order-2"
                        />
                    </div>
                </div>
            </FrameContainer>
        </RouteContainer>
    );
};

export default OrderRoute;
