import NotFoundRoute from "@/components/routes/not-found";
import {NextPage} from "next";
interface NotFoundPageProps {}

const NotFoundPage: NextPage<NotFoundPageProps> = () => {
    return (
        <div className="w-full flex justify-center items-center">
            <NotFoundRoute />
        </div>
    );
};

export default NotFoundPage;
