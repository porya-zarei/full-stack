import AddOrderRoute from "@/components/routes/orders/add-order";
import { GetServerSideProps, NextPage } from "next";

interface AddOrderPageProps {}

const AddOrderPage: NextPage<AddOrderPageProps> = () => {
    return (
        <div className="w-full flex justify-start items-start">
            <AddOrderRoute />
        </div>
    );
};

export default AddOrderPage;

export const getServerSideProps:GetServerSideProps = async () => {
    return {
        props: {}
    }
}