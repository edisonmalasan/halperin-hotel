import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import type { NextRequest } from "next/server";

// ts module augmentation for kindeAuth property
declare module "next/server" {
    interface NextRequest {
        kindeAuth?: {
            isAuthenticated?: boolean;
            user?: {
                email?: string;
                [key: string]: any;
            };
            [key: string]: any;
        };
    }
}

export default withAuth(
    async function middleware(req: NextRequest) {
        // allow public access to the homepage
        if (req.nextUrl.pathname === "/") {
            return;
        }

        // protect admin routes only allow admin user
        if (req.nextUrl.pathname.startsWith("/admin")) {
            const user = req.kindeAuth?.user;
            if (!user || user.email !== process.env.ADMIN_EMAIL ) {
                return Response.redirect(new URL("/admin/access-denied", req.url));
            }
        }

        // public client
    },
    {
        publicPaths: ["/", "/client", "/admin/access-denied"], // homepage, client, and access denied are public
    }
);

export const config = {
    matcher: [
        //run on evrything but next internals and static files
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    ],
};