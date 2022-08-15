import CInput from "@/components/core/inputs";
import CRadio from "@/components/core/inputs/radio";
import CSelectOption from "@/components/core/inputs/select";
import {useUserContext} from "@/contexts/user-context";
import {useProductCategories} from "@/hooks/useProductCategories";
import {EProductType, EPRODUCT_TYPES_NAMES} from "@/types/data";
import { enumToArray } from "@/utils/enums-helper";
import {Dispatch, FC, SetStateAction} from "react";
import {HiTrash} from "react-icons/hi";
import {OrderDataProduct} from ".";

interface AddProductProps {
    index: number;
    productData: OrderDataProduct;
    setProductsData: Dispatch<SetStateAction<OrderDataProduct[]>>;
}

const AddProduct: FC<AddProductProps> = ({
    productData,
    setProductsData,
    index,
}) => {
    const {user} = useUserContext();
    const {productCategories} = useProductCategories(user.group);

    const handleChange =
        (type = "name") =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const {name, value} = e.target;
            console.log(name, value);
            setProductsData((prev) =>
                prev.map((product) => {
                    if (product.name === name) {
                        return type === "name"
                            ? {
                                  ...product,
                                  valueName: value,
                              }
                            : type === "price"
                            ? {
                                  ...product,
                                  valuePrice: value,
                              }
                            : type === "date"
                            ? {
                                  ...product,
                                  valueDate: value,
                              }
                            : {
                                  ...product,
                                  valueCount: value,
                              };
                    }
                    return product;
                }),
            );
        };

    const handleRemoveOrderRow = (id: number) => {
        setProductsData((prev) => prev.filter((product) => product.id !== id));
    };

    const handleChangeCategory =
        (id: number) => (e: React.ChangeEvent<HTMLSelectElement>) => {
            const {name, value} = e.target;
            setProductsData((prev) =>
                prev.map((product) => {
                    if (product.id === id) {
                        return {
                            ...product,
                            valueCategory: value,
                        };
                    }
                    return product;
                }),
            );
        };

    const handleChangeProductType =
        (id: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
            const {name, value} = e.target;
            setProductsData((prev) =>
                prev.map((product) => {
                    if (product.id === id) {
                        return {
                            ...product,
                            valueType: value,
                        };
                    }
                    return product;
                }),
            );
        };

    return (
        <div
            key={productData.id}
            className="w-full flex flex-wrap md:flex-wrap items-center justify-evenly mb-4 py-2 border-y-2 border-secondary">
            <div className="w-full flex items-center justify-evenly mb-2 flex-wrap">
                <span className="font-bold">- {index + 1}</span>
                <div className="w-11/12 md:w-3/12 flex items-center justify-center">
                    <CInput
                        containerClassName="rounded-md border-2 border-gray p-2"
                        type="text"
                        value={productData.valueName}
                        name={productData.name}
                        onChange={handleChange("name")}
                        placeholder="نام کالا"
                    />
                </div>
                <div className="w-5/12 md:w-1/12 flex items-center justify-center">
                    <CInput
                        containerClassName="rounded-md border-2 border-gray p-2"
                        type="number"
                        value={productData.valuePrice}
                        name={productData.name}
                        onChange={handleChange("price")}
                        placeholder="قیمت"
                    />
                </div>
                <div className="w-3/12 md:w-1/12 flex items-center justify-center">
                    <CInput
                        containerClassName="rounded-md border-2 border-gray p-2"
                        type="number"
                        value={productData.valueCount}
                        name={productData.name}
                        onChange={handleChange("count")}
                        placeholder="تعداد"
                    />
                </div>
                <div className="w-4/12 md:w-1/12 flex items-center justify-center">
                    <span className="text-center">
                        {productData.valueCount.length &&
                            productData.valuePrice.length &&
                            Number(productData.valueCount) *
                                Number(productData.valuePrice)}
                    </span>
                </div>
                <div className="w-10/12 md:w-3/12 flex items-center justify-center">
                    <CInput
                        containerClassName="rounded-md border-2 border-gray p-2"
                        type="text"
                        value={productData.valueDate}
                        name={productData.name}
                        onChange={handleChange("date")}
                        placeholder={`تاریخ با فرمت: 1401/01/01`}
                    />
                </div>
                <button
                    title="حذف"
                    type="button"
                    onClick={() => handleRemoveOrderRow(productData.id)}
                    className="bg-danger text-white peer hover:rotate-45 px-2 py-2 transition-all rounded-full">
                    <div className="text-xl">
                        <HiTrash />
                    </div>
                </button>
            </div>
            <div className="w-full flex items-center justify-start flex-wrap">
                <fieldset className="w-full md:w-5/12 flex items-center justify-center">
                    <CRadio
                        name={`product-type-${productData.id}`}
                        title="نوع کالا : "
                        options={enumToArray(EProductType).map((type) => ({
                            value: type.value,
                            key: EPRODUCT_TYPES_NAMES[Number(type.value)],
                        }))}
                        onChange={handleChangeProductType(productData.id)}
                        className="mx-1"
                        radioContainerClassName="mx-3 user-select-none"
                    />
                </fieldset>
                <div className="w-full mt-1 md:w-5/12 flex items-center justify-center">
                    <CSelectOption
                        containerClassName="rounded-md border-2 border-gray p-2"
                        placeholder="انتخاب دسته بندی"
                        value={productData.valueCategory}
                        name={"order-category"}
                        onChange={handleChangeCategory(productData.id)}
                        options={
                            productCategories?.map((category) => ({
                                value: category.id,
                                label: category.name,
                            })) ?? []
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
