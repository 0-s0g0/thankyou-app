"use client";
import { createClient } from "@/app/utils/supabase/client";

import GoogleLogo from "../../../../public/G-logo.png";
import Image from "next/image";

export const LoginButton = () => {
  const supabase = createClient();

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/mypage`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error("ログインエラー:", error);
    }
  };

  return (
    <button
      className="py-4 w-10/12 shadow-lg rounded-md font-bold flex items-center justify-center gap-4"
      type="button"
      onClick={handleGoogleLogin}
    >
      <Image alt="google logo" src={GoogleLogo} className="w-6" />
      Googleでログイン
    </button>
  );
};
