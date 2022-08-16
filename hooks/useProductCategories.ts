import {getProductCategories} from "@/services/product-categories";
import {IProductCategory} from "@/types/data";
import {Dispatch, SetStateAction, useEffect, useState} from "react";

export const useProductCategories = (group?: string) => {
    const [productCategories, setProductCategories] = useState<
        IProductCategory[]
    >([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const changeProductCategories: Dispatch<
        SetStateAction<IProductCategory[]>
    > = (value) => {
        setProductCategories(value);
    };

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
        changeProductCategories,
    };
};
