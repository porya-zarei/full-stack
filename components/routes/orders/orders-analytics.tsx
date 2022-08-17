import PieChart from "@/components/core/charts/pie-chart";
import FrameContainer from "@/components/core/containers/frame-container";
import RouteContainer from "@/components/core/containers/route-container";
import CInput from "@/components/core/inputs";
import CSelectOption from "@/components/core/inputs/select";
import {useGroups} from "@/hooks/useGroups";
import {useOrders} from "@/hooks/useOrders";
import {ESTATUS_NAMES, IOrder, EStatus} from "@/types/data";
import {getGroupMoneyRemaining, getOrderPrice} from "@/utils";
import {getGeorgianDateFromJalali, isDateInRange} from "@/utils/date-helper";
import {group} from "console";
import {ChangeEvent, FC, useEffect, useState} from "react";
import {HiArrowDown, HiArrowUp} from "react-icons/hi";

interface OrdersAnalytictsRouteProps {}

const OrdersAnalytictsRoute: FC<OrdersAnalytictsRouteProps> = () => {
    const {orders, loading} = useOrders();
    const {groups} = useGroups();
    const [filteredOrders, setFilteredOrders] = useState<IOrder[]>([]);
    const [groupFilter, setGroupFilter] = useState("");
    const [dateFilter, setDateFilter] = useState(["", ""]);
    const [statusFilter, setStatusFilter] = useState(-1);
    const [priceSortIncrease, setPriceSortIncrease] = useState(true);
    const [dateSortIncrease, setDateSortIncrease] = useState(true);
    const [selectedGroup, setSelectedGroup] = useState("");

    const handleFilter = () => {
        const filtered = orders
            .filter((order) => {
                if (groupFilter === "") {
                    return true;
                }
                return order.user.group.id === groupFilter;
            })
            .filter((order) => {
                if (statusFilter === -1) {
                    return true;
                }
                return order.status === statusFilter;
            })
            .filter((order) => {
                if (dateFilter[0] === "" && dateFilter[1] === "") {
                    return true;
                }
                const orderDate = new Date(order.date);
                const filterDateStart = getGeorgianDateFromJalali(
                    dateFilter[0],
                );
                const filterDateEnd = getGeorgianDateFromJalali(dateFilter[1]);
                if (filterDateStart.toString() === "Invalid Date") {
                    return isDateInRange(orderDate, undefined, filterDateEnd);
                }
                if (filterDateEnd.toString() === "Invalid Date") {
                    return isDateInRange(orderDate, filterDateStart, undefined);
                }
                return isDateInRange(orderDate, filterDateStart, filterDateEnd);
            });
        setFilteredOrders(filtered);
    };
    const sortByPrice = (data: IOrder[], state: boolean) => {
        return data.sort((a, b) => {
            const aTotalPrice = a.products.reduce((acc, product) => {
                return acc + Number(product.price) * product.count;
            }, 0);
            const bTotalPrice = b.products.reduce((acc, product) => {
                return acc + Number(product.price) * product.count;
            }, 0);
            return !state
                ? aTotalPrice - bTotalPrice
                : bTotalPrice - aTotalPrice;
        });
    };
    const sortByDate = (data: IOrder[], state: boolean) => {
        return data.sort((a, b) => {
            if (!state) {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            } else {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            }
        });
    };
    const handleSort = (type: string, state: boolean) => {
        let filtered: IOrder[];
        if (type === "price") {
            filtered = sortByPrice(filteredOrders, state);
            setFilteredOrders(filtered);
        } else if (type === "date") {
            filtered = sortByDate(filteredOrders, state);
            setFilteredOrders(filtered);
        }
    };

    const handleChange =
        (type: string) => (e: ChangeEvent<HTMLInputElement>) => {
            if (type === "group") {
                setGroupFilter(e.target.value);
            } else if (type === "date-start") {
                setDateFilter((prev) => [e.target.value, prev[1]]);
            } else if (type === "date-end") {
                setDateFilter((prev) => [prev[0], e.target.value]);
            }
        };

    useEffect(() => {
        if (!loading) {
            handleFilter();
        }
    }, [loading]);
    useEffect(() => {
        handleFilter();
    }, [groupFilter, dateFilter, statusFilter]);
    return (
        <RouteContainer>
            <FrameContainer className="p-2 m-2 md:p-4 md:m-4 border-primary">
                <div className="w-full h-full flex justify-center items-start flex-wrap">
                    <div className="w-full flex justify-center items-center flex-wrap">
                        <div className="w-full flex justify-evenly items-center px-10">
                            <div className="w-10/12 md:w-5/12 flex items-center justify-center">
                                <CInput
                                    containerClassName="rounded-md border-2 border-gray p-2"
                                    type="text"
                                    value={dateFilter[0]}
                                    name={"date-start"}
                                    onChange={handleChange("date-start")}
                                    placeholder={`تاریخ شروع با فرمت: 1401/01/01`}
                                />
                            </div>
                            <div className="w-10/12 md:w-5/12 flex items-center justify-center">
                                <CInput
                                    containerClassName="rounded-md border-2 border-gray p-2"
                                    type="text"
                                    value={dateFilter[1]}
                                    name={"date-end"}
                                    onChange={handleChange("date-end")}
                                    placeholder={`تاریخ پایان با فرمت: 1401/01/01`}
                                />
                            </div>
                        </div>
                        <div className="w-10/12 flex items-center justify-start p-3 flex-wrap">
                            <span className="text-gray-600">انتخاب گروه:</span>
                            <CSelectOption
                                containerClassName="rounded-md border-2 border-gray p-2"
                                placeholder="انتخاب گروه"
                                value={groupFilter.toString()}
                                name={"group"}
                                onChange={(e) => setGroupFilter(e.target.value)}
                                options={groups?.map((g) => ({
                                    value: g.id,
                                    label: g.name,
                                }))}
                            />
                        </div>
                        <div className="w-10/12 flex items-center justify-start p-3 flex-wrap">
                            <span className="text-gray-600">انتخاب وضعیت:</span>
                            <CSelectOption
                                containerClassName="rounded-md border-2 border-gray p-2"
                                placeholder="انتخاب وضعیت"
                                value={statusFilter.toString()}
                                name={"status"}
                                onChange={(e) =>
                                    setStatusFilter(Number(e.target.value))
                                }
                                options={[
                                    {
                                        label: "همه",
                                        value: String(-1),
                                        selected: true,
                                    },
                                    ...Object.keys(EStatus)
                                        .filter((s) => !isNaN(Number(s)))
                                        .map((s) => ({
                                            value: s,
                                            label: ESTATUS_NAMES[Number(s)],
                                        })),
                                ]}
                            />
                        </div>
                    </div>
                    <div className="w-full flex justify-center items-center flex-wrap">
                        <table className="w-full table-auto text-center text-[10px]">
                            <thead className="bg-primary text-white">
                                <tr>
                                    <th className="md:px-4 md:py-2 px-1 py-1">
                                        <span className="text-white">#</span>
                                    </th>
                                    <th className="md:px-4 md:py-2 px-1 py-1">
                                        <span className="text-white">
                                            نام سفارش دهنده
                                        </span>
                                    </th>
                                    <th className="md:px-4 md:py-2 px-1 py-1">
                                        <span className="text-white">
                                            وضعیت
                                        </span>
                                    </th>
                                    <th className="md:px-4 md:py-2 px-1 py-1">
                                        <span className="text-white">
                                            تعداد کالا
                                        </span>
                                    </th>
                                    <th className="md:px-4 md:py-2 px-1 py-1">
                                        <span className="text-white">
                                            هزینه کل
                                        </span>
                                        <button
                                            className={`${
                                                priceSortIncrease
                                                    ? "text-white"
                                                    : "text-white"
                                            }`}
                                            onClick={() => {
                                                setPriceSortIncrease(
                                                    !priceSortIncrease,
                                                );
                                                handleSort(
                                                    "price",
                                                    !priceSortIncrease,
                                                );
                                            }}>
                                            {priceSortIncrease ? (
                                                <HiArrowDown />
                                            ) : (
                                                <HiArrowUp />
                                            )}
                                        </button>
                                    </th>
                                    <th className="md:px-4 md:py-2 px-1 py-1">
                                        <span className="text-white">
                                            تاریخ
                                        </span>
                                        <button
                                            className={`${
                                                dateSortIncrease
                                                    ? "text-white"
                                                    : "text-white"
                                            }`}
                                            onClick={() => {
                                                setDateSortIncrease(
                                                    !dateSortIncrease,
                                                );
                                                handleSort(
                                                    "date",
                                                    !dateSortIncrease,
                                                );
                                            }}>
                                            {dateSortIncrease ? (
                                                <HiArrowDown />
                                            ) : (
                                                <HiArrowUp />
                                            )}
                                        </button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.map((order, index) => (
                                    <tr key={index}>
                                        <td className="md:px-4 md:py-2 px-1 py-1">
                                            <span className="">
                                                {index + 1}
                                            </span>
                                        </td>
                                        <td className="md:px-4 md:py-2 px-1 py-1">
                                            <span className="">
                                                {order.user.fullName}
                                            </span>
                                        </td>
                                        <td className="md:px-4 md:py-2 px-1 py-1">
                                            <span className="">
                                                {ESTATUS_NAMES[order.status]}
                                            </span>
                                        </td>
                                        <td className="md:px-4 md:py-2 px-1 py-1">
                                            <span className="">
                                                {order.products.reduce(
                                                    (acc, product) =>
                                                        acc + product.count,
                                                    0,
                                                )}
                                            </span>
                                        </td>
                                        <td className="md:px-4 md:py-2 px-1 py-1">
                                            <span className="">
                                                {order.products.reduce(
                                                    (acc, product) => {
                                                        return (
                                                            acc +
                                                            Number(
                                                                product.price,
                                                            ) *
                                                                product.count
                                                        );
                                                    },
                                                    0,
                                                )}
                                            </span>
                                        </td>
                                        <td className="md:px-4 md:py-2 px-1 py-1">
                                            <span className="">
                                                {new Date(
                                                    order.date,
                                                ).toLocaleDateString("fa-IR")}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </FrameContainer>
            <FrameContainer className="p-4 m-4 border-primary">
                <div className="w-full flex justify-center items-center flex-wrap max-w-md">
                    <PieChart
                        priceForEachGroup={filteredOrders.reduce(
                            (data, order) => {
                                const group = order.user.group;
                                const price = order.products.reduce(
                                    (acc, product) =>
                                        acc +
                                        Number(product.price) * product.count,
                                    0,
                                );
                                if (Object.keys(data).includes(group.name)) {
                                    data[group.name] += price;
                                } else {
                                    data[group.name] = price;
                                }
                                return data;
                            },
                            {} as Record<string, number>,
                        )}
                    />
                </div>
            </FrameContainer>
            <FrameContainer className="p-4 m-4 border-primary">
                <div className="w-full flex justify-center items-center flex-wrap max-w-md">
                    <div className="w-10/12 flex items-center justify-start p-3 flex-wrap">
                        <span className="text-gray-600">انتخاب گروه:</span>
                        <CSelectOption
                            containerClassName="rounded-md border-2 border-gray p-2"
                            placeholder="انتخاب گروه"
                            value={selectedGroup}
                            name={"group"}
                            onChange={(e) => setSelectedGroup(e.target.value)}
                            options={groups?.map((g) => ({
                                value: g.id,
                                label: g.name,
                            }))}
                        />
                    </div>
                    {selectedGroup.length > 0 && (
                        <PieChart
                            priceForEachGroup={{
                                "هزینه سفارشات": getOrderPrice(
                                    orders.filter(
                                        (o) =>
                                            o.user.group.id === selectedGroup,
                                    ),
                                ),
                                "هزینه مانده": getGroupMoneyRemaining(
                                    groups,
                                    orders,
                                    selectedGroup,
                                ),
                            }}
                        />
                    )}
                </div>
            </FrameContainer>
        </RouteContainer>
    );
};

export default OrdersAnalytictsRoute;
