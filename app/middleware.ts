import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        return NextResponse.next();
    },
    {
        callbacks: {
            // Allow access if the user is authenticated
            authorized: ({ token }) => !!token,
            // Redirect to the login page if not authenticated
            // TODO: Code 
        },
    }
);

export const config = {
    matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
    "/api/admin/:path*",
    ],
}