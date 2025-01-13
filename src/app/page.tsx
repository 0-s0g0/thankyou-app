"use client";

import { redirect } from "next/navigation";

export default function Start() {

  //遷移先指定
  const handleRedirect = () => {
    redirect("/Post");
  };

  return (
    <div className="text-center flex flex-col justify-center">
      <div className="mt-[20vh] text-lg text-black font-bold ">
        <h1 className="flex justify-center items-end text-6xl mt-1 mb-2">
          ThanksLink
        </h1>
      </div>

      <div
        className="fixed top-0 w-screen sm:w-[420px] min-h-svh"
        onClick={handleRedirect}
      >
        <h1 className="mt-[60vh] font-bold text-2xl text-yellow animate-bounce">
          タップで始める
        </h1>
      </div>
    </div>
  );
}
