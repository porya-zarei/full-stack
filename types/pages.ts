import {NextPage} from "next";
import type {AppProps} from "next/app";

export type NextPageWithLayout = NextPage & {
    getLayout: (page: NextPage) => NextPage;
};

export type NextAppProps = AppProps & {
    Component: NextPageWithLayout;
};
