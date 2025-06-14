import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        // Allow public access to guest pages and the root page
        if (req.nextUrl.pathname.startsWith("/login") ||
            req.nextUrl.pathname.startsWith("/register") ||
            req.nextUrl.pathname === "/") {
            return NextResponse.next();
        }

        // Protect user and admin routes
        if (req.nextUrl.pathname.startsWith("/user") ||
            req.nextUrl.pathname.startsWith("/admin")) {
            const token = req.nextauth.token;
            if (!token) {
                return NextResponse.redirect(new URL("/login", req.url));
            }
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    matcher: [
        "/user/:path*",
        "/admin/:path*",
        "/login",
        "/register",
    ],
}; 