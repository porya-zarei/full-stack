import { useUserContext } from "@/contexts/user-context";
import { autoLoginClient } from "@/utils/auth";
import {FC, useEffect} from "react";
import Sidebar from "../../core/sidebar";

interface DefaultLayoutMainProps {
    children: React.ReactNode;
}

const DefaultLayoutMain: FC<DefaultLayoutMainProps> = ({children}) => {
    const {changeToken, changeUser, isUserLoggedIn} = useUserContext();
    useEffect(() => {
        if (!isUserLoggedIn()) {
            const result = autoLoginClient();
            if (result) {
                changeToken(result.token);
                changeUser(result.user);
            }
        }
    }, []);
    return (
        <main className="w-full h-auto flex justify-center items-start">
            <section className="sticky top-0 w-2/12 md:w-2/12 flex justify-center items-center h-full">
                <div className="sticky top-0 right-0 w-full min-h-screen h-full z-20 flex justify-center items-start pt-20 shadow-left">
                    <Sidebar />
                </div>
            </section>
            <section className="w-10/12 md:w-10/12 flex justify-center items-center h-auto">
                {children}
            </section>
        </main>
    );
};

export default DefaultLayoutMain;
