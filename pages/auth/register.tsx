import { NextPageWithLayout } from "@/types/pages";

interface RegisterPageProps {
    
}
 
const RegisterPage: NextPageWithLayout<RegisterPageProps> = () => {
    return (
        <div className="w-full min-h-screen h-full flex items-center justify-center"></div>
    );
}

RegisterPage.getLayout = (page: NextPageWithLayout) => <div>{page}</div>;

export default RegisterPage;