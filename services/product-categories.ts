import {API_ROUTES} from "@/server/constants/routes";
import {IAPIResult} from "@/types/api";
import {EGroup, ICreateProductCategory, IProductCategory} from "@/types/data";
import {axios_instance} from "./axios";

export const getProductCategories = async (group?: EGroup) => {
    try {
        console.log("in getProductCategories group: ", group);
        if (!isNaN(Number(String(group)))) {
            const result = await axios_instance.post<
                IAPIResult<IProductCategory[]>
            >(API_ROUTES.productCategories.getProductCategoriesByGroup, {
                group,
            });
            return result.data;
        } else {
            const result = await axios_instance.get<
                IAPIResult<IProductCategory[]>
            >(API_ROUTES.productCategories.getProductCategories);
            return result.data;
        }
    } catch (error) {
        console.log("error in get product categories => ", error);
        const result: IAPIResult<IProductCategory[]> = {
            data: [] as IProductCategory[],
            error: "error in get product categories",
            ok: false,
        };
        return result;
    }
};

export const createProductCategory = async (
    productCategory: ICreateProductCategory,
) => {
    try {
        const result = await axios_instance.post<IAPIResult<IProductCategory>>(
            API_ROUTES.productCategories.addProductCategory,
            {
                productCategory,
            },
        );
        return result.data;
    } catch (error) {
        console.log("error in create product category => ", error);
        const result: IAPIResult<IProductCategory> = {
            data: {} as IProductCategory,
            error: "error in create product category",
            ok: false,
        };
        return result;
    }
};
