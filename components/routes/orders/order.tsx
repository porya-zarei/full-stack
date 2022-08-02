import FrameContainer from "@/components/core/containers/frame-container";
import RouteContainer from "@/components/core/containers/route-container";
import {FC} from "react";
import {IOrder} from "@/types/data";
import Order from "@/components/core/order";
import Image from "next/image";
import IMAGES from "@/constants/images";

interface OrderRouteProps {
    order: IOrder | null;
}

const OrderRoute: FC<OrderRouteProps> = ({order}) => {
    return (
        <RouteContainer>
            <FrameContainer className="min-h-[82vh] m-4 border-primary">
                <div className="w-full flex justify-center items-center flex-wrap">
                    <div className="w-full md:w-1/3 order-2 md:order-1">
                        {order && <Order order={order} />}
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
