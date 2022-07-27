import { NextPageWithLayout } from "@/types/pages";
import LoginRoute from "@/components/routes/auth/login";

interface LoginPageProps {
    
}
 
const LoginPage: NextPageWithLayout<LoginPageProps> = () => {
    return ( 
        <div className="w-full flex items-center justify-center">
            <LoginRoute/>
        </div>
     );
}

LoginPage.getLayout = (page: NextPageWithLayout) => <div>{page}</div>;

export default LoginPage;