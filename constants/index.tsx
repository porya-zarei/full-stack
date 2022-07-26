import {
    HiShoppingCart,
    HiDocumentAdd,
    HiOutlineClipboardList,
} from "react-icons/hi";

export interface ISidebarItem {
    icon: React.ReactElement;
    name: string;
    path: string;
}

export const SIDEBAR_ITEMS:ISidebarItem[] = [
    {
        name: "سفارشات",
        icon: <HiShoppingCart />,
        path: "/orders",
    },
    {
        name: "افزودن سفارش",
        icon: <HiDocumentAdd />,
        path: "/orders/add-order",
    },
    {
        name: "تایید سفارشات",
        icon: <HiOutlineClipboardList />,
        path: "/orders/orders-list",
    },
];
