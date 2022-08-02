import {
    HiShoppingCart,
    HiDocumentAdd,
    HiOutlineClipboardList,
    HiOutlineDocumentAdd,
    HiUsers,
    HiOutlineUserAdd,
    HiOutlineUserCircle,
    HiOutlineChartBar,
} from "react-icons/hi";

export interface ISidebarItem {
    icon: React.ReactElement;
    name: string;
    path: string;
    subPaths?: ISidebarItem[];
}

export const SIDEBAR_ITEMS: ISidebarItem[] = [
    {
        name: "سفارشات",
        icon: <HiShoppingCart />,
        path: "/orders",
        subPaths: [
            {
                name: "افزودن سفارش",
                icon: <HiOutlineDocumentAdd />,
                path: "/orders/add-order",
            },
            {
                name: "تایید سفارشات",
                icon: <HiOutlineClipboardList />,
                path: "/orders/orders-list",
            },
            {
                name: "انالیز سفارشات",
                icon: <HiOutlineChartBar />,
                path: "/orders/orders-analytics",
            }
        ],
    },
    {
        name: "کابران",
        icon: <HiUsers />,
        path: "/users",
        subPaths: [
            {
                name: "افزودن کاربر",
                icon: <HiOutlineUserAdd />,
                path: "/users/add-user",
            },
            {
                name:"ویرایش کاربران",
                icon: <HiOutlineUserCircle />,
                path: "/users/change-users",
            }
        ],
    }
];
