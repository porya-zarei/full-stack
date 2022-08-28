import { FC } from "react";

interface RouteContainerProps {
    children: React.ReactNode;
}
 
const RouteContainer: FC<RouteContainerProps> = ({children}) => {
    return ( 
        <div className="flex justify-start items-start w-full h-full pt-16 flex-wrap px-1">
            {children}
        </div>
     );
}
 
export default RouteContainer;