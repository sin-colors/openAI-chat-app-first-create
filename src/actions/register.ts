"use server";
import { ResisterFormValues } from "@/lib/schema";
import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcryptjs";

export async function userRegister({
  name,
  email,
  password,
}: ResisterFormValues) {
  try {
    if (!name || !email || !password)
      throw new Error("入力されていない項目があります");
    const prisma = new PrismaClient();
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new Error("すでに使われているメールアドレスです");
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    return { success: true, message: "正常に作成されました" };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "エラーが発生しました",
    };
  }
}
