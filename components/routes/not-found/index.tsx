import CButton from "@/components/core/buttons";
import FrameContainer from "@/components/core/containers/frame-container";
import RouteContainer from "@/components/core/containers/route-container";
import {useRouter} from "next/router";
import {FC} from "react";

interface NotFoundRouteProps {}

const NotFoundRoute: FC<NotFoundRouteProps> = () => {
    const router = useRouter();
    return (
        <RouteContainer>
            <FrameContainer className="min-h-[82vh] m-4 border-primary">
                <div className="w-full flex justify-center items-center flex-wrap">
                    <div className="w-full mb-10 flex justify-center items-center">
                        <h3 className="font-bold">
                            صفحه مورد نظر شما یافت نشد
                        </h3>
                    </div>
                    <div className="w-full flex justify-center items-center">
                        <CButton
                            text="صفحه اصلی"
                            variant="outline"
                            onClick={() => {
                                router.push("/");
                            }}
                            className="w-full md:w-auto border-primary text-primary my-1 md:my-0 text-center py-2 px-4 rounded-2xl"
                        />
                    </div>
                </div>
            </FrameContainer>
        </RouteContainer>
    );
};

export default NotFoundRoute;
