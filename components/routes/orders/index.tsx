import {FC} from "react";
import FrameContainer from "@/components/core/containers/frame-container";
import RouteContainer from "@/components/core/containers/route-container";

interface OrdersRouteProps {}

const OrdersRoute: FC<OrdersRouteProps> = () => {
    return (
        <RouteContainer>
            <FrameContainer className="min-h-[82vh] m-4 border-primary">
                1
            </FrameContainer>
        </RouteContainer>
    );
};

export default OrdersRoute;
