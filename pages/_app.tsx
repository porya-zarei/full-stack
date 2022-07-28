import "@/styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";

import DefaultLayout from "@/components/layouts/default";
import {ViewContextProvider} from "@/contexts/view-context";
import {NextAppProps} from "@/types/pages";
import {UserContextProvider} from "@/contexts/user-context";
import {ReactNode} from "react";
import {ToastContainer} from "react-toastify";

const App = ({Component, pageProps}: NextAppProps) => {
    const getLayout =
        Component.getLayout ||
        ((page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>);
    return (
        <ViewContextProvider>
            <UserContextProvider>
                {getLayout(<Component {...pageProps} />)}
                <ToastContainer />
            </UserContextProvider>
        </ViewContextProvider>
    );
};

export default App;
