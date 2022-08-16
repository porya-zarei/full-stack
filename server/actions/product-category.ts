import {IAPIResult} from "@/types/api";
import {ICreateProductCategory, IProductCategory} from "@/types/data";
import {Types} from "mongoose";
import {
    createProductCategoryMDB,
    deleteProductCategoryMDB,
    getProductCategoriesByGroupMDB,
    getProductCategoriesMDB,
    getProductCategoryMDB,
    updateProductCategoryMDB,
} from "../mongoose/functions";

export const getAllProductCategories = async () => {
    const productCategories = await getProductCategoriesMDB();
    if (productCategories) {
        const result: IAPIResult<IProductCategory[]> = {
            data: productCategories,
            ok: productCategories.length > 0,
            error: "",
        };
        return result;
    }
    return {
        data: null,
        ok: false,
        error: "no product categories found",
    } as IAPIResult<IProductCategory[] | null>;
};

export const getProductCategory = async (id: string) => {
    const productCategory = await getProductCategoryMDB(id);
    if (productCategory) {
        const result: IAPIResult<IProductCategory> = {
            data: productCategory,
            ok: !!productCategory,
            error: "",
        };
        return result;
    }
    return {
        data: null,
        ok: false,
        error: "product category not found",
    } as IAPIResult<IProductCategory | null>;
};

export const createProductCategory = async (
    productCategory: ICreateProductCategory,
) => {
    const id = new Types.ObjectId().toString();
    const newProductCategory = await createProductCategoryMDB({
        ...productCategory,
        id,
        _id: id,
    });
    if (newProductCategory) {
        const result: IAPIResult<IProductCategory> = {
            data: newProductCategory,
            ok: !!newProductCategory,
            error: "",
        };
        return result;
    }

    return {
        data: null,
        ok: false,
        error: "product category not created",
    } as IAPIResult<IProductCategory | null>;
};

export const updateProductCategory = async (
    id: string,
    productCategory: IProductCategory,
) => {
    const updatedProductCategory = await updateProductCategoryMDB(
        id,
        productCategory,
    );
    if (updatedProductCategory) {
        const result: IAPIResult<IProductCategory> = {
            data: updatedProductCategory,
            ok: !!updatedProductCategory,
            error: "",
        };
        return result;
    }
    return {
        data: null,
        ok: false,
        error: "product category not updated",
    } as IAPIResult<IProductCategory | null>;
};

export const deleteProductCategory = async (id: string) => {
    const deletedProductCategory = await deleteProductCategoryMDB(id);
    if (deletedProductCategory) {
        const result: IAPIResult<string> = {
            data: "deleted",
            ok: true,
            error: "",
        };
        return result;
    }
    return {
        data: null,
        ok: false,
        error: "product category not deleted",
    } as IAPIResult<IProductCategory | null>;
};

export const getProductCategoriesByGroup = async (group: string) => {
    const productCategories = await getProductCategoriesByGroupMDB(group);
    if (productCategories) {
        const result: IAPIResult<IProductCategory[]> = {
            data: productCategories,
            ok: productCategories.length > 0,
            error: "",
        };
        return result;
    }
    return {
        data: null,
        ok: false,
        error: "no product categories found",
    } as IAPIResult<IProductCategory[] | null>;
};
