import RegisterForm from "@/components/RegisterForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function SignupPage() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-3xl flex-col items-center justify-center">
        <RegisterForm />
        <p className="mt-4">
          すでにアカウントをお持ちの場合
          <Button
            asChild
            size={"sm"}
            variant={"link"}
            className="cursor-pointer text-lg text-blue-800 hover:text-blue-700/90"
          >
            <Link href={"/login"}>ログインへ</Link>
          </Button>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
