import {NextRequest, NextResponse} from "next/server";

export const middleware = async (request: NextRequest) => {
    const token = request.cookies?.get("token");
    console.log("in middleware TOKEN => ", token);
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
