import {FC} from "react";
import FrameContainer from "@/components/core/containers/frame-container";
import RouteContainer from "@/components/core/containers/route-container";

interface HomeRouteProps {}

const HomeRoute: FC<HomeRouteProps> = () => {
    return (
        <RouteContainer>
            <FrameContainer className="min-h-[82vh] m-4 border-primary">
                1
            </FrameContainer>
            <FrameContainer className="min-h-[82vh] m-4 border-primary">
                2
            </FrameContainer>
        </RouteContainer>
    );
};

export default HomeRoute;
