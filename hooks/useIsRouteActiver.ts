import {useRouter} from "next/router";

export const useIsRouteActive = (route: string) => {
    const router = useRouter(); ;
    return router.pathname.startsWith(route);
};
