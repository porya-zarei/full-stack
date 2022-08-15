import FrameContainer from "@/components/core/containers/frame-container";
import RouteContainer from "@/components/core/containers/route-container";
import CSelectOption from "@/components/core/inputs/select";
import Loading from "@/components/core/loadings";
import Modal from "@/components/core/modal";
import {useModal} from "@/hooks/useModal";
import {useProductCategories} from "@/hooks/useProductCategories";
import {EGROUPS_NAMES, IProductCategory} from "@/types/data";
import {FC, useState} from "react";
import {
    HiOutlinePencil,
    HiOutlinePencilAlt,
    HiOutlineTrash,
} from "react-icons/hi";
import AddProductCategory from "./add-product-category";

interface ProductCategoryRouteProps {}

const ProductCategoryRoute: FC<ProductCategoryRouteProps> = () => {
    const {productCategories, loading, refetch} = useProductCategories();
    const categories = productCategories.reduce((acc, category) => {
        if (Object.keys(acc).includes(EGROUPS_NAMES[category.group])) {
            acc[EGROUPS_NAMES[category.group]].push(category);
        } else {
            acc[EGROUPS_NAMES[category.group]] = [category];
        }
        return acc;
    }, {} as Record<string, Array<IProductCategory>>);
    const {ModalWrapper, handleClose, isOpen, handleOpen} = useModal();
    return (
        <RouteContainer>
            <FrameContainer className="m-2 md:m-4 border-primary">
                <div className="w-full flex items-start justify-center flex-wrap p-3">
                    <div className="w-full flex items-center justify-center">
                        <h3 className="text-2xl font-semibold">
                            مدیریت دسته بندی های کالا های هر گروه
                        </h3>
                    </div>
                    <div className="w-full flex items-center justify-center flex-wrap my-3">
                        <button
                            onClick={handleOpen}
                            type="button"
                            className="w-full text-lg flex items-center justify-center m-1 bg-info rounded-full p-3">
                            <span className="text-lg font-semibold">
                                <HiOutlinePencil />
                            </span>
                            <span>افزودن دسته بندی جدید</span>
                        </button>
                        <ModalWrapper>
                            <AddProductCategory
                                refetch={refetch}
                                handleClose={handleClose}
                            />
                        </ModalWrapper>
                    </div>
                    <div className="w-full flex items-center justify-center flex-wrap">
                        {loading ? (
                            <Loading />
                        ) : (
                            Object.keys(categories)?.map((group) => (
                                <div
                                    key={group}
                                    className="w-full flex flex-wrap items-center justify-start">
                                    <div className="w-full flex items-center justify-start">
                                        <h4 className="text-xl font-bold">
                                            {group}
                                        </h4>
                                    </div>
                                    <div className="w-full flex items-center justify-center flex-wrap">
                                        {categories[group].map((category) => (
                                            <div
                                                key={category.id}
                                                className="w-full flex items-center justify-between my-2 px-4 py-2 hover:bg-secondary-light hover:bg-opacity-40 rounded-md overflow-hidden">
                                                <div className="flex justify-center items-center">
                                                    <i className="font-semibold ml-2">
                                                        -
                                                    </i>
                                                    <span>{category.name}</span>
                                                </div>
                                                <div className="flex justify-center items-center text-lg overflow-hidden rounded-md">
                                                    <button
                                                        title="ویرایش"
                                                        type="button"
                                                        className="bg-primary text-white font-semibold px-4 py-2">
                                                        <HiOutlinePencilAlt />
                                                    </button>
                                                    <button
                                                        title="حذف"
                                                        type="button"
                                                        className="bg-danger text-white font-semibold px-4 py-2">
                                                        <HiOutlineTrash />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </FrameContainer>
        </RouteContainer>
    );
};

export default ProductCategoryRoute;
