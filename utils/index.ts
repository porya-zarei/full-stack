import {IGroup, IOrder} from "@/types/data";
import {getCurrentJalaliYear} from "./date-helper";

export const getOrderPrice = (order: IOrder | IOrder[]) => {
    if (Array.isArray(order)) {
        let sum = 0;
        order.forEach((o) => {
            const {products} = o;
            const price = products.reduce((acc, product) => {
                return acc + Number(product.price) * Number(product.count);
            }, 0);
            sum += price;
        });
        return sum;
    } else {
        const {products} = order;
        const price = products.reduce((acc, product) => {
            return acc + Number(product.price) * Number(product.count);
        }, 0);
        return price;
    }
};

export const getGroupMoneyRemaining = (
    groups: IGroup[],
    orders: IOrder[],
    selectedGroup: string,
) => {
    const group = groups.find((g) => g?.id === selectedGroup);
    const filteredOrders = orders.filter(
        (o) => o.user?.group?.id === selectedGroup,
    );
    if (group && filteredOrders.length) {
        const currentYear = getCurrentJalaliYear();
        const groupPrice = group?.moneyLimitYears.find(
            (ml) => ml?.year === currentYear,
        );
        const ordersPrice = getOrderPrice(filteredOrders);
        return Number(groupPrice?.limit ?? 0) - Number(ordersPrice);
    }
    return 0;
};
