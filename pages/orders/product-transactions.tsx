import ProductTransactionsRoute from "@/components/routes/orders/product-transactions";
import {NextPage} from "next";

interface ProductTransactionsPageProps {}

const ProductTransactionsPage: NextPage<ProductTransactionsPageProps> = () => {
    return (
        <div className="w-full flex justify-center items-center">
            <ProductTransactionsRoute />
        </div>
    );
};

export default ProductTransactionsPage;
