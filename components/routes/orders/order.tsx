import FrameContainer from "@/components/core/containers/frame-container";
import RouteContainer from "@/components/core/containers/route-container";
import {FC, useEffect, useState} from "react";
import {ERole, IOrder} from "@/types/data";
import Order from "@/components/core/order";
import Image from "next/image";
import IMAGES from "@/constants/images";
import {deleteOrder, updateOrderStatus} from "@/services/orders";
import useNotification from "@/hooks/useNotification";
import {useUserContext} from "@/contexts/user-context";
import {HiOutlineCubeTransparent} from "react-icons/hi";
import {useOrder} from "@/hooks/useOrder";
import { useRouter } from "next/router";

interface OrderRouteProps {
    id: string;
}

const OrderRoute: FC<OrderRouteProps> = ({id}) => {
    const {order, loading, changeOrder} = useOrder(id);
    const {user} = useUserContext();
    const {notify} = useNotification();
    const [updateLoading, setUpdateLoading] = useState(false);
    const router = useRouter();
    const handleUpdateStatus = (confirmed: boolean) => async () => {
        try {
            setUpdateLoading(true);
            const result = await updateOrderStatus(order.id, confirmed);
            if (result.ok && result.data) {
                notify("وضعیت با موفقیت اپدیت شد", {
                    type: "success",
                });
                changeOrder({...order, status: result?.data?.status});
            } else {
                notify("به روزرسانی با مشکل رو به رو شد", {
                    type: "error",
                });
            }
        } catch (error) {
            console.log("error in update status => ", error);
            notify("به روزرسانی با مشکل رو به رو شد", {
                type: "error",
            });
        } finally {
            setUpdateLoading(false);
        }
    };
    const handleDelete = async () => {
        try {
            setUpdateLoading(true);
            const result = await deleteOrder(order.id);
            if (result.ok && result.data) {
                notify("وضعیت با موفقیت اپدیت شد", {
                    type: "success",
                });
                router.push("/orders/orders-list")
            } else {
                notify("به روزرسانی با مشکل رو به رو شد", {
                    type: "error",
                });
            }
        } catch (error) {
            console.log("error in update status => ", error);
            notify("به روزرسانی با مشکل رو به رو شد", {
                type: "error",
            });
        } finally {
            setUpdateLoading(false);
        }
    };
    return (
        <RouteContainer>
            <FrameContainer className="min-h-[82vh] h-auto m-auto md:m-4 border-primary">
                <div className="w-full flex justify-center items-center flex-wrap">
                    <div className="w-full flex justify-center items-center md:w-2/3 order-2 md:order-1 p-2">
                        {!loading ? (
                            <Order
                                order={order}
                                handleCancel={handleUpdateStatus(false)}
                                handleConfirm={handleUpdateStatus(true)}
                                handleDelete={handleDelete}
                                userRole={user.role}
                                loading={updateLoading}
                            />
                        ) : (
                            <HiOutlineCubeTransparent
                                size={40}
                                className="rotate-and-rescale-animation"
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
