"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { resisterFormSchema, ResisterFormValues } from "@/lib/schema";
import { userRegister } from "@/actions/user";

function RegisterForm() {
  const form = useForm<ResisterFormValues>({
    resolver: zodResolver(resisterFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const isSubmitting = form.formState.isSubmitting;
  const router = useRouter();
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (data: ResisterFormValues) => {
          const result = await userRegister(data);
          if (result.success) {
            toast.success(result.message, { autoClose: 5000 });
            setTimeout(() => router.push("/login"), 5000);
          } else {
            toast.error(result.error || "エラーが発生しました");
          }
        })}
        className="text-zinc-800"
      >
        <h1 className="text-center text-3xl font-bold">ユーザー登録</h1>
        <div className="mt-6 flex flex-col gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grid w-full max-w-md min-w-xs items-center gap-1.5">
                <FormLabel>名前</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="w-full"
                    placeholder="Shingo"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                    placeholder="example@ne.jp"
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
            {isSubmitting ? "送信中" : "登録"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default RegisterForm;
