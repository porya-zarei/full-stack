import FrameContainer from "@/components/core/containers/frame-container";
import RouteContainer from "@/components/core/containers/route-container";
import {FC} from "react";

interface AddUserRouteProps {}

const AddUserRoute: FC<AddUserRouteProps> = () => {
    return (
        <RouteContainer>
            <FrameContainer className="m-4 border-primary">
                <div className="w-full flex items-start justify-center flex-wrap p-3"></div>
            </FrameContainer>
        </RouteContainer>
    );
};

export default AddUserRoute;
