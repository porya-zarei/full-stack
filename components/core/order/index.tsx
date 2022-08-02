import {IOrder} from "@/types/data";
import {FC} from "react";

interface OrderProps {
    order: IOrder;
    className?: string;
}

const Order: FC<OrderProps> = ({order, className}) => {
    return (
        <article
            className={`w-full max-w-sm p-3 md:p-5 rounded-2xl shadow-around flex justify-center items-start flex-wrap ${className}`}>
            <div className="w-full flex justify-center items-center flex-wrap">
                <div className="w-full my-2 flex justify-center items-center">
                    <span className="text-xl text-center pb-2 border-b-2 border-solid border-secondary">
                        ثبت کننده : {order.user.fullName}
                    </span>
                </div>
                <div className="w-full my-2 flex justify-center items-center">
                    <span className="text-xl text-center pb-2 border-b-2 border-solid border-secondary">
                        برای : {order.supervisor.fullName}
                    </span>
                </div>
                <div className="w-full my-2 flex justify-center items-center">
                    <span className="text-sm text-gray-400 text-center pb-2 border-b-2 border-solid border-secondary">
                        تاریخ ثبت :{" "}
                        {new Date(order.date).toLocaleString("fa-IR")}
                    </span>
                </div>
            </div>
            <div className="w-full flex justify-center items-center flex-wrap my-3">
                <table className="w-full relative text-sm table-auto border-solid border-2 border-gray-400 rounded-md max-h-[150px]">
                    <thead className="bg-gray-200">
                        <tr className="text-center">
                            <th className="px-2 py-1">نام محصول</th>
                            <th className="px-2 py-1">هزینه</th>
                            <th className="px-2 py-1">تعداد</th>
                            <th className="px-2 py-1">تاریخ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.products.map((product, index) => (
                            <tr key={index} className="text-center">
                                <td className="px-2 py-1">{product.name}</td>
                                <td className="px-2 py-1">{product.price}</td>
                                <td className="px-2 py-1">{product.count}</td>
                                <td className="px-2 py-1">{(new Date(product.date)).toLocaleDateString("fa-IR")}</td>
                            </tr>
                        ))}
                        <tr key={"sum"} className="text-center border-t-2 border-primary">
                            <td className="px-2 py-1">
                                تعداد : {order.products.reduce((sum, product) => sum + product.count, 0)}
                            </td>
                            <td className="px-2 py-1">جمع کل :</td>
                            <td className="px-2 py-1">
                                {order.products.reduce(
                                    (sum, product) =>
                                        sum + Number(product.price) * Number(product.count),
                                    0,
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="w-full flex justify-center items-center flex-wrap border-t-2 border-gray-light border-dashed py-1">
                <div className="w-full flex justify-start items-center my-2">
                    توضیحات :
                </div>
                <p className="w-full flex justify-center items-center flex-wrap">
                    {order.description}
                </p>
            </div>
            <div className="w-full mt-2 flex justify-evenly items-center flex-wrap border-t-2 border-gray-light border-dashed py-2">
                <button className="w-full md:w-auto my-1 md:my-0 bg-primary text-white text-center py-2 px-4 rounded-2xl">
                    تایید سفارش
                </button>
                <button className="w-full md:w-auto my-1 md:my-0 bg-secondary text-white text-center py-2 px-4 rounded-2xl">
                    رد سفارش
                </button>
            </div>
        </article>
    );
};

export default Order;
