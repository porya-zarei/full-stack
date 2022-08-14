import {getProductCategories} from "@/services/product-categories";
import {EGroup, IProductCategory} from "@/types/data";
import {useEffect, useState} from "react";

export const useProductCategories = (group?: EGroup) => {
    const [productCategories, setProductCategories] = useState<
        IProductCategory[]
    >([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const getProductCategoriesHandler = async () => {
        console.log("in getProductCategoriesHandler");
        setLoading(true);
        try {
            const result = await getProductCategories(group);
            if (result.ok && result.data) {
                setProductCategories(result.data);
            }
        } catch (error) {
            setError(`error in get productCategories => ${error}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProductCategoriesHandler();
    }, [group]);

    return {
        productCategories,
        loading,
        error,
        refetch: getProductCategoriesHandler,
    };
};
