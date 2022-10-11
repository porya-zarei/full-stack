import {BASE_URL} from "@/constants/api";
import {
    EProductType,
    EPRODUCT_TYPES_NAMES,
    ERole,
    EStatus,
    ESTATUS_NAMES,
    IOrder,
} from "@/types/data";
import {getDaysBetween} from "@/utils/date-helper";
import {enumToArray} from "@/utils/enums-helper";
import {FC, Dispatch, SetStateAction} from "react";
import {HiOutlineDocumentText} from "react-icons/hi";
import CButton from "../buttons";
import CFile from "../inputs/file";
import Loading from "../loadings";

interface OrderProps {
    order: IOrder;
    className?: string;
    userRole?: ERole;
    handleConfirm?: () => void;
    handleCancel?: () => void;
    handleDelete?: () => void;
    handleUploadInvoice?: (file: File[] | File) => Promise<void>;
    upload?: boolean;
    loading: boolean;
    invoiceFile: File | File[] | null;
    setInvoiceFile: Dispatch<SetStateAction<File | File[] | null>>;
}

const Order: FC<OrderProps> = ({
    order,
    className,
    userRole,
    handleCancel,
    handleConfirm,
    handleDelete,
    handleUploadInvoice,
    loading,
    upload = false,
    invoiceFile,
    setInvoiceFile,
}) => {
    return (
        <article
            className={`w-full p-1 md:p-5 rounded-2xl shadow-around flex justify-center items-start flex-wrap ${className}`}>
            <div className="w-full flex justify-center items-center flex-wrap">
                <div className="w-full my-2 flex justify-center items-center">
                    <span className="text-xl text-center pb-2 border-b-2 border-solid border-secondary">
                        ثبت کننده : {order?.user?.fullName}
                    </span>
                </div>
                <div className="w-full my-2 flex justify-center items-center">
                    <span className="text-xl text-center pb-2 border-b-2 border-solid border-secondary">
                        برای : {order?.supervisor?.fullName}
                    </span>
                </div>
                <div className="w-full my-2 flex justify-center items-center">
                    <span className="text-sm text-gray-400 text-center pb-2 border-b-2 border-solid border-secondary">
                        تاریخ ثبت :{" "}
                        {new Date(order?.date).toLocaleString("fa-IR")}
                    </span>
                </div>
            </div>
            <div className="w-full flex justify-center items-center flex-wrap my-3">
                <div className="w-full overflow-x-auto">
                    <table className="w-full relative text-sm bg-light border-solid border-2 border-gray-400 rounded-md max-h-[150px]">
                        <thead className="bg-gray-200">
                            <tr className="text-center w-auto">
                                <th className="px-2 py-1">نام محصول</th>
                                <th className="px-2 py-1">هزینه</th>
                                <th className="px-2 py-1">تعداد</th>
                                <th className="px-2 py-1">تاریخ</th>
                                <th className="px-2 py-1">نوع</th>
                                <th className="px-2 py-1">دسته</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order?.products?.map((product, index) => (
                                <tr key={index} className="text-center">
                                    <td className="px-2 py-1">
                                        {product.name}
                                    </td>
                                    <td className="px-2 py-1">
                                        {Number(product.price).toLocaleString(
                                            "fa-IR",
                                        )}
                                    </td>
                                    <td className="px-2 py-1">
                                        {Number(product.count).toLocaleString(
                                            "fa-IR",
                                        )}
                                    </td>
                                    <td
                                        title={`${getDaysBetween(
                                            order.date,
                                            product.date,
                                        )} روز پس از ثبت سفارش`}
                                        className="px-2 py-1">
                                        {new Date(
                                            product.date,
                                        ).toLocaleDateString("fa-IR")}
                                    </td>
                                    <td className="px-2 py-1">
                                        {
                                            EPRODUCT_TYPES_NAMES[
                                                Number(
                                                    enumToArray(
                                                        EProductType,
                                                    ).find(
                                                        (t) =>
                                                            Number(t.value) ===
                                                            product.type,
                                                    )?.value,
                                                )
                                            ]
                                        }
                                    </td>
                                    <td className="px-2 py-1">
                                        {product.category.name}
                                    </td>
                                </tr>
                            ))}
                            <tr
                                key={"sum"}
                                className="text-center border-t-2 border-primary">
                                <td className="px-2 py-1 w-auto whitespace-nowrap">
                                    تعداد کل :{" "}
                                    {order?.products
                                        ?.reduce?.(
                                            (sum, product) =>
                                                sum + product.count,
                                            0,
                                        )
                                        .toLocaleString("fa-IR")}
                                </td>
                                <td className="px-2 py-1 w-auto whitespace-nowrap">
                                    جمع کل :
                                </td>
                                <td className="px-2 py-1 w-auto whitespace-nowrap">
                                    {order?.products
                                        ?.reduce(
                                            (sum, product) =>
                                                sum +
                                                Number(product.price) *
                                                    Number(product.count),
                                            0,
                                        )
                                        .toLocaleString("fa-IR")}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="w-full flex justify-center items-center flex-wrap border-t-2 border-gray-light border-dashed py-1">
                <div className="w-full flex-wrap flex justify-start items-center my-2 text-sm">
                    <span className="w-full md:w-auto border-b-2 border-gray-light mx-auto flex justify-center items-center">
                        وضعیت : {ESTATUS_NAMES[order?.status]}
                    </span>
                    <span className="w-full md:w-auto border-b-2 border-gray-light mx-auto flex justify-center items-center">
                        فاکتور رسمی : {order.officialBill ? "دارد" : "ندارد"}
                    </span>
                    <span className="w-full md:w-auto border-b-2 border-gray-light mx-auto flex justify-center items-center">
                        بیش از حد مجاز : {order.isExtra ? "است" : "نیست"}
                    </span>
                </div>
                <div className="w-full flex justify-center items-center flex-wrap py-2 my-2 border-y-2 border-secondary-dark">
                    <div className="w-full flex justify-start items-center mb-1">
                        توضیحات :
                    </div>
                    <p className="w-full flex justify-center items-center flex-wrap">
                        {order?.description}
                    </p>
                </div>
                {order.status === EStatus.REJECTED && (
                    <div className="w-full flex justify-center items-center flex-wrap">
                        <span className="mx-2 p-2">دلیل رد سفارش : </span>
                        <p className="">{order?.responseText}</p>
                    </div>
                )}
                {order?.invoice && order?.invoice?.length > 0 ? (
                    <div className="w-full flex justify-center items-center my-2">
                        <a
                            className="p-2 w-auto flex justify-center items-center border-y-2 border-transparent transition-all hover:border-y-2 hover:border-dark"
                            download={true}
                            target="_blank"
                            rel="noreferrer"
                            href={`${BASE_URL}assets/files/${
                                order.invoice ?? ""
                            }`}>
                            دانلود فاکتور
                        </a>
                    </div>
                ) : upload ? (
                    <CFile
                        file={invoiceFile}
                        setFile={setInvoiceFile}
                        text={`فایل خود را اپلود کنید ${
                            !Array.isArray(invoiceFile) &&
                            ` - ${invoiceFile?.name}`
                        }`}
                        className="p-2 border-2 border-dark rounded-md"
                        iconClassName="mx-2"
                        textClassName="mx-2"
                        icon={<HiOutlineDocumentText />}
                        name="invoice"
                        title="فایل پیش فاکتور خود را انتخاب کنید"
                        onGetFile={handleUploadInvoice}
                    />
                ) : (
                    ""
                )}
            </div>
            {userRole !== ERole.USER && (
                <div className="w-full mt-2 flex justify-evenly items-center flex-wrap border-t-2 border-gray-light border-dashed py-2">
                    <CButton
                        text={loading ? <Loading size={20} /> : "تایید سفارش"}
                        onClick={handleConfirm}
                        disabled={loading}
                        variant="outline"
                        className="w-full md:w-auto border-primary text-primary my-1 md:my-0 text-center py-2 px-4 rounded-2xl"
                    />
                    <CButton
                        text={loading ? <Loading size={20} /> : "رد سفارش"}
                        onClick={handleCancel}
                        disabled={loading}
                        variant="outline"
                        className="w-full md:w-auto my-1 md:my-0 border-secondary text-secondary text-center py-2 px-4 rounded-2xl"
                    />
                    {userRole === ERole.CREATOR && (
                        <CButton
                            disabled={loading}
                            onClick={handleDelete}
                            text={loading ? <Loading size={20} /> : "حذف سفارش"}
                            variant="outline"
                            className="w-full md:w-auto my-1 md:my-0 border-danger text-danger text-center py-2 px-4 rounded-2xl"
                        />
                    )}
                </div>
            )}
        </article>
    );
};

export default Order;
