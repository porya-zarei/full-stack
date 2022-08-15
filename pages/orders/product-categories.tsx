import ProductCategoryRoute from "@/components/routes/orders/product-categories";
import {FC} from "react";

interface ProductCategoriesPageProps {}

const ProductCategoriesPage: FC<ProductCategoriesPageProps> = () => {
    return (
        <div className="w-full flex justify-start items-start">
            <ProductCategoryRoute />
        </div>
    );
};

export default ProductCategoriesPage;
