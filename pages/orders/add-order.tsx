import {FC} from "react";
import AddOrderRoute from "@/components/routes/orders/add-order";
import { GetServerSideProps } from "next";

interface AddOrderPageProps {}

const AddOrderPage: FC<AddOrderPageProps> = () => {
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