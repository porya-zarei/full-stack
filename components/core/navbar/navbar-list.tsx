import {FC} from "react";
import {APP_ROUTES} from "@/constants/routes";
import {useViewContext} from "@/contexts/view-context";
import NavbarListItem from "./navbar-list-item";
import {IRoute} from "@/constants/routes";

interface NavbarListProps {}

const NavbarList: FC<NavbarListProps> = () => {
    const {showNavbar} = useViewContext();
    return (
        <ul
            className={`w-full md:w-10/12  ${
                showNavbar ? "flex" : "hidden"
            } justify-start items-center order-3 md:order-2 flex-wrap md:flex-nowrap fade-in`}>
            {APP_ROUTES.map((route) => (
                <li
                    key={route.name}
                    className="flex justify-center items-center p-2 w-full md:w-auto">
                    <NavbarListItem
                        route={route}
                        className="hover:bg-light hover:bg-opacity-10 py-2 px-4 m-1 rounded-md"
                        activeClassName="bg-light bg-opacity-20"
                    />
                </li>
            ))}
        </ul>
    );
};

export default NavbarList;
