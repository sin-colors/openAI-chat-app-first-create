import { RoomType } from "@/generated/prisma";
import * as z from "zod";

//-----------------------user-----------------------------
export const resisterFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "名前は２文字以上で入力してください" })
    .max(10, { message: "名前は10文字以内で入力してください" }),
  email: z.email({ message: "無効なメールアドレスです" }),
  password: z
    .string()
    .min(8, { message: "パスワードは８文字以上で入力してください" })
    .max(30, { message: "パスワードは30文字以内で入力してください" }),
});
export type ResisterFormValues = z.infer<typeof resisterFormSchema>;

export const loginFormSchema = z.object({
  email: z
    .email({ message: "メールアドレスとして正しくありません" })
    .min(1, { message: "メールアドレスを入力してください" }),
  password: z.string().min(1, { message: "パスワードを入力してください" }),
});
export type LoginFormValues = z.infer<typeof loginFormSchema>;

// -----------------------room------------------------------
// export const roomTypeSchema = z.nativeEnum(RoomType); // z.nativeEnumは非推奨となった
// z.nativeEnumを使わない書き方(推奨される書き方)
// Object.values(RoomType)→ RoomTypeオブジェクトのすべての値（'conversation', 'image_generation'など）を含む配列を生成
// Object.values(RoomType) の引数として渡されるRoomTypeはJavaScriptのオブジェクトそのもの
// as [RoomType, ...RoomType[]]を付けないとstring[]と推論される
// z.enumは、「空ではない文字列のタプル型」を期待する
// こっちのRoomTypeはTypeScriptの型として使用されていて、RoomTypeオブジェクトの「値」のユニオン型となる
const roomTypeValues = Object.values(RoomType) as [RoomType, ...RoomType[]];
// z.enumは、文字列の配列を受け取り、その配列内の文字列のみを許容するenum型を定義する
export const roomTypeSchema = z.enum(roomTypeValues);
export const roomSchema = z.object({
  id: z.string(),
  type: roomTypeSchema,
  firstMessage: z.string(),
  ownerId: z.string(),
});
export type RoomValue = z.infer<typeof roomSchema>;
