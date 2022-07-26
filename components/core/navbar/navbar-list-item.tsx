import Link from "next/link";
import {FC} from "react";
import {IRoute} from "@/constants/routes";
import {useIsRouteActive} from "@/hooks/useIsRouteActiver";

interface NavbarListItemProps {
    route: IRoute;
    className?: string;
    activeClassName?: string;
}

const NavbarListItem: FC<NavbarListItemProps> = ({
    route,
    className,
    activeClassName,
}) => {
    const isActive = useIsRouteActive(route.path);
    return (
        <Link passHref href={route.path}>
            <a
                className={`inline-flex justify-center items-center w-full ${className} ${
                    isActive && activeClassName
                }`}>
                <span className="text-light inline">{route.name}</span>
            </a>
        </Link>
    );
};

export default NavbarListItem;
