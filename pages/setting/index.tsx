import SettingRoute from "@/components/routes/setting";
import {NextPage} from "next";
interface SettingPageProps {}

const SettingPage: NextPage<SettingPageProps> = () => {
    return (
        <div className="w-full flex justify-center items-center">
            <SettingRoute />
        </div>
    );
};

export default SettingPage;
