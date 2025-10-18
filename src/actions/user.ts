"use server";
import { LoginFormValues, ResisterFormValues } from "@/lib/schema";
// import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";
import { makePrismaClient } from "@/lib/prisma-client";

export async function userRegister({
  name,
  email,
  password,
}: ResisterFormValues) {
  try {
    if (!name || !email || !password)
      throw new Error("入力されていない項目があります");
    const prisma = makePrismaClient();
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new Error("すでに使われているメールアドレスです");
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    return {
      success: true,
      message: "登録が完了しました　３秒後ログインページに移動します",
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "エラーが発生しました",
    };
  }
}

export async function userAuthorize(data: LoginFormValues) {
  try {
    const result = await signIn("credentials", { ...data, redirect: false });
    if (result) return { success: true, message: "ログインしました" };
  } catch (err) {
    console.error(err);
    if (err instanceof CredentialsSignin)
      return { success: false, message: err.message };
    return { success: false, message: "ログインに失敗しました" };
  }
}
