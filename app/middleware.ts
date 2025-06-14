import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        // Redirect authenticated users away from auth pages
        if (
            req.nextUrl.pathname.startsWith("/login") ||
            req.nextUrl.pathname.startsWith("/register")
        ) {
            if (req.nextauth.token) {
                return NextResponse.redirect(new URL("/dashboard", req.url));
            }
        }

        // Redirect unauthenticated users to login
        if (
            req.nextUrl.pathname.startsWith("/dashboard") ||
            req.nextUrl.pathname.startsWith("/bookings") ||
            req.nextUrl.pathname.startsWith("/profile")
        ) {
            if (!req.nextauth.token) {
                return NextResponse.redirect(new URL("/login", req.url));
            }
        }
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
        "/dashboard/:path*",
        "/bookings/:path*",
        "/profile/:path*",
        "/login",
        "/register",
    ],
}