import {FC} from "react";
import FrameContainer from "@/components/core/containers/frame-container";
import RouteContainer from "@/components/core/containers/route-container";
import Image from "next/image";
import IMAGES from "@/constants/images";

interface HomeRouteProps {}

const HomeRoute: FC<HomeRouteProps> = () => {
    return (
        <RouteContainer>
            <FrameContainer className="min-h-[82vh] m-4 border-primary">
                <div className="w-full flex justify-center items-center flex-wrap">
                    <div className="w-full flex justify-center items-center flex-wrap">
                        <p className="text-center text-xl">
                            داشبورد مدیریت سفارشات شرکت امید فضا
                        </p>
                    </div>
                </div>
            </FrameContainer>
        </RouteContainer>
    );
};

export default HomeRoute;
