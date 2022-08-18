import ProductCategoryRoute from "@/components/routes/orders/product-categories";
import {NextPage} from "next";

interface ProductCategoriesPageProps {}

const ProductCategoriesPage: NextPage<ProductCategoriesPageProps> = () => {
    return (
        <div className="w-full flex justify-start items-start">
            <ProductCategoryRoute />
        </div>
    );
};

export default ProductCategoriesPage;
