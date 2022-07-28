import {NextPage} from "next";
import type {AppProps} from "next/app";
import {ReactNode} from "react";

export type NextPageWithLayout<T = {}> = NextPage<T> & {
    getLayout: (page: ReactNode) => ReactNode;
};

export type NextAppProps<T = {}> = AppProps & {
    Component: NextPageWithLayout<T>;
};
