"use client";

import { useRouter } from "next/navigation";
import { Headline } from "../components/headline";
import { createClient } from "@/app/utils/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import Link from "next/link";

const Mypage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        if (error) throw error;

        if (!user) {
          router.push("/login");
          return;
        }

        setUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        router.push("/login");
      }
    });

    getUser();

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <Headline headline={"マイページ"} />
      <div className="mt-8 w-full flex flex-col gap-4 justify-center items-center">
        <div className="space-y-2">
          <p>
            <span className="font-medium">ID:</span> {user?.id}
          </p>
          <p>
            <span className="font-medium">Email:</span> {user?.email}
          </p>
          <p>
            <span className="font-medium">最終ログイン:</span>
            {user?.last_sign_in_at
              ? new Date(user.last_sign_in_at).toLocaleString()
              : "N/A"}
          </p>
        </div>

        <Link
          href={"/analysis"}
          className="w-[60vw] h-16 bg-pink-light text-black shadow-md rounded-lg flex flex-col justify-center items-center"
        >
          <h1 className="text-lg font-bold">分析</h1>
        </Link>

        <button
          onClick={async () => {
            const { error } = await supabase.auth.signOut();
            if (!error) {
              router.push("/login");
            }
          }}
          className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 
                     transition-colors duration-200"
        >
          ログアウト
        </button>
      </div>
    </div>
  );
};

export default Mypage;
