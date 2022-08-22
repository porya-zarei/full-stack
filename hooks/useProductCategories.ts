import {getProductCategories} from "@/services/product-categories";
import {IProductCategory} from "@/types/data";
import {Dispatch, SetStateAction, useEffect, useState} from "react";

export const useProductCategories = (
    group?: string,
    force: boolean = false,
) => {
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
        console.log("in getProductCategoriesHandler => ", group);
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
        if (force) {
            if (group && group?.length > 0) {
                getProductCategoriesHandler();
            }
        } else {
            getProductCategoriesHandler();
        }
    }, [group, force]);

    return {
        productCategories,
        loading,
        error,
        refetch: getProductCategoriesHandler,
        changeProductCategories,
    };
};
