import Head from "next/head";
import {FC} from "react";

interface DefaultLayoutMetaProps {}

const DefaultLayoutMeta: FC<DefaultLayoutMetaProps> = () => {
    return (
        <Head>
            <title>پنل مدیریتی امیدفضا</title>
            <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
            />
            <meta name="description" content="پنل مدیریتی امیدفضا" />
            <meta name="keywords" content="پنل مدیریتی امیدفضا" />
            <meta name="author" content="pzeinstein@gmail.com" />
            <meta name="robots" content="noindex" />
            <meta name="language" content="fa" />
            <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/assets/images/icons/cropped-namadak-32x32.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="180x180"
                href="/assets/images/icons/cropped-namadak-180x180.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="192x192"
                href="/assets/images/icons/cropped-namadak-192x192.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="270x270"
                href="/assets/images/icons/cropped-namadak-270x270.png"
            />
            <link
                rel="apple-touch-icon"
                href="/assets/images/icons/cropped-namadak-180x180.png"
            />
        </Head>
    );
};

export default DefaultLayoutMeta;
