import {FC} from "react";
import {ISidebarItem} from "@/constants";
import Link from "next/link";

interface SidebarListItemProps {
    item: ISidebarItem;
}

const SidebarListItem: FC<SidebarListItemProps> = ({item}) => {
    return (
        <Link passHref href={item.path}>
            <a
                type="button"
                className="flex items-center justify-center md:justify-start w-full px-1 py-3 rounded-md hover:bg-secondary hover:bg-opacity-20">
                <span className="text-2xl md:text-2xl flex items-center justify-center text-primary">
                    {item.icon}
                </span>
                <span className="hidden md:flex mr-3 items-center justify-center">
                    {item.name}
                </span>
            </a>
        </Link>
    );
};

export default SidebarListItem;
