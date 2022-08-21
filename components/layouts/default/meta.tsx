import Head from "next/head";
import { FC } from "react";

interface DefaultLayoutMetaProps {
    
}
 
const DefaultLayoutMeta: FC<DefaultLayoutMetaProps> = () => {
    return ( 
        <Head>
            <title>پنل مدیریتی امیدفضا</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta name="description" content="پنل مدیریتی امیدفضا" />
            <meta name="keywords" content="پنل مدیریتی امیدفضا" />
            <meta name="author" content="pzeinstein@gmail.com" />
        </Head>
     );
}
 
export default DefaultLayoutMeta;