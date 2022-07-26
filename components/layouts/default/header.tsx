import {FC} from "react";
import Navbar from "@/components/core/navbar";

interface DefaultLayoutHeaderProps {}

const DefaultLayoutHeader: FC<DefaultLayoutHeaderProps> = () => {
    return (
        <header className="fixed top-0 right-0 w-full z-30">
            <Navbar />
        </header>
    );
};

export default DefaultLayoutHeader;
