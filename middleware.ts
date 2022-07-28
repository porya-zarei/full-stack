import {NextRequest, NextResponse} from "next/server";

export const middleware = async (
    request: NextRequest & {
        user?: any | null;
        token?: string | null;
    },
) => {
    const token = request.cookies?.get("token");
    if (token) {
        return NextResponse.next();
    } else {
        const url = request.nextUrl.clone();
        url.pathname = "/auth/login";
        return NextResponse.redirect(url);
    }
};

export const config = {
    matcher: ["/"],
};
