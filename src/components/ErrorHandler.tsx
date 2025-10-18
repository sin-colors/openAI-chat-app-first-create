"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

function ErrorHandler() {
  const params = useSearchParams();
  useEffect(() => {
    const errorCode = params.get("error_code");
    switch (errorCode) {
      case "loginRequired":
        toast.warning("ログインしてください", { autoClose: 3000 });
        break;
      case "pageNotFound":
        toast.warning("ページが見つかりませんでした", { autoClose: 3000 });
        break;
      case "loggedIn":
        toast.warning("すでにログインしています", { autoClose: 3000 });
        break;
    }
  }, [params]);
  return null;
}

export default ErrorHandler;
