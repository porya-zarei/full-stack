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
                        <div className="w-10/12 md:w-2/3 h-auto flex justify-center items-center">
                            <Image
                                src={IMAGES.dashboard}
                                layout="intrinsic"
                                alt="داشبورد"
                            />
                        </div>
                        <div className="w-full flex justify-center items-center">
                            <p className="text-center text-xl whitespace-pre-wrap mt-3">
                                داشبورد مدیریت مالی شرکت امید فضا
                            </p>
                        </div>
                    </div>
                </div>
            </FrameContainer>
        </RouteContainer>
    );
};

export default HomeRoute;
