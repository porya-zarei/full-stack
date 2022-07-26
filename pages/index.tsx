import type {NextPage} from "next";
import HomeRoute from "@/components/routes/home";

const HomePage: NextPage = () => {
    return (
        <div className="w-full flex justify-center items-center">
            <HomeRoute />
        </div>
    );
};

export default HomePage;
