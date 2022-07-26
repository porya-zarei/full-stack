import "@/styles/globals.scss";
import DefaultLayout from "@/components/layouts/default";
import {ViewContextProvider} from "@/contexts/view-context";
import {NextAppProps} from "@/types/pages";
import {NextPage} from "next";

const App = ({Component, pageProps}: NextAppProps) => {
    const getLayout =
        Component.getLayout ||
        ((page: NextPage) => <DefaultLayout>{page}</DefaultLayout>);
    return (
        <ViewContextProvider>
            {getLayout(<Component {...pageProps} />)}
        </ViewContextProvider>
    );
};

export default App;
