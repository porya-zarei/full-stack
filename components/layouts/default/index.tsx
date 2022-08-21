import {FC} from "react";
import DefaultLayoutFooter from "./footer";
import DefaultLayoutHeader from "./header";
import DefaultLayoutMain from "./main";
import DefaultLayoutMeta from "./meta";

interface DefaultLayoutProps {
    children: React.ReactNode;
}

const DefaultLayout: FC<DefaultLayoutProps> = ({children}) => {
    return (
        <div>
            <DefaultLayoutMeta />
            <DefaultLayoutHeader />
            <DefaultLayoutMain>{children}</DefaultLayoutMain>
            <DefaultLayoutFooter />
        </div>
    );
};

export default DefaultLayout;
