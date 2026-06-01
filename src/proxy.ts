import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
  const { supabaseResponse, user, profile } = await updateSession(request);
  const { pathname } = request.nextUrl;

  // Trailing slash important : "/provider/" ne matche pas "/providers" (liste publique).
  const isClient = pathname === "/client" || pathname.startsWith("/client/");
  const isProvider = pathname === "/provider" || pathname.startsWith("/provider/");
  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");
  const isPrivate = isClient || isProvider || isAdmin;

  if (isPrivate && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  if (user && profile) {
    if (isClient && profile.role !== "client" && profile.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (isProvider && profile.role !== "provider" && profile.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (isAdmin && profile.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
