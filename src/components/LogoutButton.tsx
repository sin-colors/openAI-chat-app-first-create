"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

function LogoutButton() {
  const router = useRouter();
  return (
    <form
      action={async () => {
        await signOut({ redirect: false });
        toast.success("ログアウトしました", { autoClose: 1500 });
        router.push("/login");
      }}
    >
      <Button
        variant={"link"}
        type="submit"
        className="cursor-pointer hover:bg-transparent"
      >
        ログアウト
      </Button>
    </form>
  );
}

export default LogoutButton;
