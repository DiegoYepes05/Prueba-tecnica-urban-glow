import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isRouteProtected = createRouteMatcher([
  "/dashboard/home",
  "/dashboard/categories",
  "/dashboard/professional",
  "/dashboard/services/create",
  "/dashboard/services",
]);

export default clerkMiddleware(async (auth, req) => {
  if (req.nextUrl.pathname === "/") {
    const dashboardUrl = new URL("/dashboard/home", req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  if (isRouteProtected(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/",
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
