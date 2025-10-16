"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { loginFormSchema, LoginFormValues } from "@/lib/schema";
import { toast } from "react-toastify";
import { userAuthorize } from "@/actions/user";

function LoginForm() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const isSubmitting = form.formState.isSubmitting;
  const router = useRouter();
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (data: LoginFormValues) => {
          const result = await userAuthorize(data);
          if (result?.success) {
            toast.success(result.message);
            router.push("/conversation");
          } else {
            toast.error(result?.message);
          }
        })}
        className="text-zinc-800"
      >
        <h1 className="text-center text-3xl font-bold">ログイン</h1>
        <div className="mt-6 flex flex-col gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grid w-full max-w-md min-w-xs items-center gap-1.5">
                <FormLabel>メールアドレス</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    className="w-full"
                    placeholder="example@com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="grid w-full max-w-md min-w-xs items-center gap-1.5">
                <FormLabel>パスワード</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="w-full"
                    placeholder="８文字以上の英数字"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-8 w-full">
          <Button
            className="w-full bg-zinc-800 py-5 text-lg tracking-widest hover:bg-zinc-700/85"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "認証中" : "ログイン"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default LoginForm;
