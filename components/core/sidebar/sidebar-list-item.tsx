import {FC} from "react";
import {ISidebarItem} from "@/constants";
import Link from "next/link";
import {useIsRouteActive} from "@/hooks/useIsRouteActiver";

interface SidebarListItemProps {
    item: ISidebarItem;
    isSubPath:boolean;
}

const SidebarListItem: FC<SidebarListItemProps> = ({item,isSubPath}) => {
    const isActive = useIsRouteActive(item.path);
    return (
        <Link passHref href={item.path}>
            <a
                type="button"
                className="relative flex items-center justify-center md:justify-start w-full px-1 py-2 rounded-md hover:bg-secondary hover:bg-opacity-20 group">
                <span
                    className={`text-2xl md:text-2xl flex items-center justify-center text-primary `}>
                    {item.icon}
                </span>
                <span
                    className={`hidden group-hover:-translate-x-3 transition-all md:flex mr-3 items-center justify-center relative w-auto ${
                        isActive &&
                        "after:h-2 after:w-full after:rounded-full after:absolute after:-bottom-1 after:right-0 after:-z-10"
                    } ${
                        isActive && isSubPath
                            ? "after:bg-secondary-light"
                            : "after:bg-primary-light"
                    }`}>
                    {item.name}
                </span>
            </a>
        </Link>
    );
};

export default SidebarListItem;
