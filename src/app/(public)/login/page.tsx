import LoginForm from "@/components/LoginForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function LoginPage() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-3xl flex-col items-center justify-center">
        <LoginForm />
        <p className="mt-4">
          まだアカウントをお持ちでない場合は
          <Button
            size={"sm"}
            variant={"link"}
            className="cursor-pointer text-lg text-blue-800 hover:text-blue-700/90"
          >
            <Link href="/signup">登録へ</Link>
          </Button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
