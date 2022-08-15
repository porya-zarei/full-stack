import {FC} from "react";
import {HiOutlineCubeTransparent} from "react-icons/hi";

interface LoadingProps {
    size?: number;
}

const Loading: FC<LoadingProps> = ({size = 40}) => {
    return (
        <HiOutlineCubeTransparent
            size={size}
            className="rotate-and-rescale-animation"
        />
    );
};

export default Loading;
