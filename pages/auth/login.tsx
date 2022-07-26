import { NextPageWithLayout } from "@/types/pages";

interface LoginPageProps {
    
}
 
const LoginPage: NextPageWithLayout<LoginPageProps> = () => {
    return ( 
        <div className="w-full min-h-screen h-full flex items-center justify-center">
            
        </div>
     );
}

LoginPage.getLayout = (page: NextPageWithLayout) => <div>{page}</div>;

export default LoginPage;