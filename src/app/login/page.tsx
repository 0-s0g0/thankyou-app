"use client";

import React from "react";

import { Headline } from "../components/headline";
import { LoginButton } from "./components/LoginButton";
export default function LoginPage() {
  return (
    <div>
      <Headline headline={"ログイン"} />
      <div className="mt-8 w-full flex flex-col justify-center items-center">
        <LoginButton />
      </div>
    </div>
  );
}
