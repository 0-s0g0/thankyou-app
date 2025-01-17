import { createClient } from "@/app/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    const next = searchParams.get("next") ?? "/";

    if (code) {
      const supabase = await createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error("認証エラー:", error);
        return NextResponse.redirect(`${origin}/auth/error`);
      }

      return NextResponse.redirect(`${origin}${next}`);
    }

    return NextResponse.redirect(`${origin}/auth/error`);
  } catch (error) {
    console.error("予期せぬエラー:", error);
    return NextResponse.redirect(`${origin}/auth/error`);
  }
}
