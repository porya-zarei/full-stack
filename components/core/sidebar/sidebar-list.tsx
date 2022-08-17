import {FC} from "react";
import {SIDEBAR_ITEMS} from "@/constants";
import SidebarListItem from "./sidebar-list-item";
import {useUserContext} from "@/contexts/user-context";
import {ROUTES_STATE} from "@/constants/routes";
import {ERole} from "@/types/data";

interface SidebarListProps {}

const SidebarList: FC<SidebarListProps> = () => {
    const {user, isUserLoggedIn} = useUserContext();
    return (
        <ul className="flex flex-col items-start justify-center w-full">
            {isUserLoggedIn() &&
                SIDEBAR_ITEMS.map((item) => (
                    <>
                        <li
                            key={item.name}
                            className="flex items-center justify-center w-full p-1">
                            <SidebarListItem isSubPath={false} item={item} />
                        </li>
                        {item.subPaths &&
                            item.subPaths
                                .filter((subItem) => {
                                    if (user.role === ERole.USER) {
                                        return (
                                            subItem.renderState ===
                                            ROUTES_STATE.USER_LOGED_IN
                                        );
                                    } else if (user.role === ERole.CREATOR) {
                                        return (
                                            subItem.renderState ===
                                                ROUTES_STATE.USER_IS_CREATOR ||
                                            subItem.renderState ===
                                                ROUTES_STATE.USER_LOGED_IN
                                        );
                                    } else {
                                        return (
                                            subItem.renderState ===
                                                ROUTES_STATE.USER_LOGED_IN ||
                                            subItem.renderState ===
                                                ROUTES_STATE.USER_IS_ADMIN
                                        );
                                    }
                                })
                                .map((subItem) => (
                                    <li
                                        key={subItem.name}
                                        className="flex items-center justify-center w-full p-1">
                                        -{" "}
                                        <SidebarListItem
                                            isSubPath={true}
                                            item={subItem}
                                        />
                                    </li>
                                ))}
                    </>
                ))}
        </ul>
    );
};

export default SidebarList;
