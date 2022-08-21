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
            <div className="w-6/12 md:w-3/12 flex justify-center md:justify-between items-center order-1">
                <span className="m-auto flex justify-center items-center">
                    <Image
                        src={IMAGES.besmellahImage}
                        alt="بسم الله"
                        width={120}
                        height={40}
                    />
                </span>
                <span className="m-auto flex justify-center items-center">
                    <Image
                        src={IMAGES.logo}
                        alt="logo"
                        width={100}
                        height={40}
                        className="rounded-full"
                    />
                </span>
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
