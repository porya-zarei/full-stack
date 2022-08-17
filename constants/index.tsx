import {
    HiShoppingCart,
    HiDocumentAdd,
    HiOutlineClipboardList,
    HiOutlineDocumentAdd,
    HiUsers,
    HiOutlineUserCircle,
    HiOutlineChartBar,
    HiOutlineArchive,
    HiOutlineUserGroup,
    HiOutlinePresentationChartLine,
} from "react-icons/hi";
import { ROUTES_STATE } from "./routes";

export interface ISidebarItem {
    icon: React.ReactElement;
    name: string;
    path: string;
    subPaths?: ISidebarItem[];
    renderState?: ROUTES_STATE;
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
                renderState: ROUTES_STATE.USER_LOGED_IN,
            },
            {
                name: "تایید سفارشات",
                icon: <HiOutlineClipboardList />,
                path: "/orders/orders-list",
                renderState: ROUTES_STATE.USER_LOGED_IN,
            },
            {
                name: "انالیز سفارشات",
                icon: <HiOutlineChartBar />,
                path: "/orders/orders-analytics",
                renderState: ROUTES_STATE.USER_LOGED_IN,
            },
            {
                name: "دسته بندی کالاها",
                icon: <HiOutlineArchive />,
                path: "/orders/product-categories",
                renderState: ROUTES_STATE.USER_IS_CREATOR,
            },
        ],
    },
    {
        name: "کابران",
        icon: <HiUsers />,
        path: "/users",
        subPaths: [
            {
                name: "ویرایش کاربران",
                icon: <HiOutlineUserCircle />,
                path: "/users/change-users",
                renderState: ROUTES_STATE.USER_IS_CREATOR,
            },
        ],
    },
    {
        name: "گروه ها ",
        icon: <HiOutlineUserGroup />,
        path: "/groups",
        subPaths: [
            {
                name: "مدیریت گروه ها",
                icon: <HiOutlinePresentationChartLine />,
                path: "/groups/manage-groups",
                renderState: ROUTES_STATE.USER_IS_CREATOR,
            },
        ],
    },
];
