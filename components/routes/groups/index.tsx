import FrameContainer from "@/components/core/containers/frame-container";
import RouteContainer from "@/components/core/containers/route-container";
import {FC} from "react";

interface GroupsRouteProps {}

const GroupsRoute: FC<GroupsRouteProps> = () => {
    return (
        <RouteContainer>
            <FrameContainer className="min-h-[82vh] m-4 border-primary">
                <div className="w-full flex justify-center items-center flex-wrap">
                    گروه ها
                </div>
            </FrameContainer>
        </RouteContainer>
    );
};

export default GroupsRoute;
