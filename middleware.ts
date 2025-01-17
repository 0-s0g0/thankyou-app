import { createClient } from "@/app/utils/supabase/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    const { supabase, response } = createClient(request);
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session && request.nextUrl.pathname.startsWith("/protected")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return response;
  } catch (e) {
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
}

export const config = {
  matcher: [
    /*
     * マッチするパスを指定:
     * - /auth/callback
     * - /protected/:path*
     */
    "/auth/callback",
    "/protected/:path*",
  ],
};
