import Image from "next/image";
import {FC} from "react";
import {HiOutlineBell, HiMenuAlt1} from "react-icons/hi";
import {useViewContext} from "@/contexts/view-context";
import NavbarList from "./navbar-list";
import IMAGES from "@/constants/images";
interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
    const {changeShowNavbar} = useViewContext();
    return (
        <nav className="flex justify-between md:justify-center items-center w-full bg-dark text-light flex-wrap md:flex-nowrap">
            <div className="w-4/12 md:w-1/12 flex justify-center md:justify-between items-center order-1">
                <Image
                    src={IMAGES.logo}
                    alt="logo"
                    width={100}
                    height={50}
                    className="rounded-full"
                />
            </div>
            <NavbarList />
            <div className="flex justify-center items-center order-2 md:order-3 mx-2">
                <button
                    type="button"
                    
                    title="نوتیفیکیشن"
                    className="p-1 m-1 rounded-full flex justify-center items-center">
                    <span className="text-2xl hover:animate-pulse">
                        <HiOutlineBell />
                    </span>
                </button>
                <button
                    type="button"
                    title="منو"
                    onClick={() => changeShowNavbar((p: boolean) => !p)}
                    className="p-1 m-1 rounded-full flex md:hidden justify-center items-center">
                    <span className="text-2xl">
                        <HiMenuAlt1 />
                    </span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
