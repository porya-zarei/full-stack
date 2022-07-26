import {FC} from "react";
import DefaultLayoutFooter from "./footer";
import DefaultLayoutHeader from "./header";
import DefaultLayoutMain from "./main";

interface DefaultLayoutProps {
    children: React.ReactNode;
}

const DefaultLayout: FC<DefaultLayoutProps> = ({children}) => {
    return (
        <div>
            <DefaultLayoutHeader />
            <DefaultLayoutMain>{children}</DefaultLayoutMain>
            <DefaultLayoutFooter />
        </div>
    );
};

export default DefaultLayout;
