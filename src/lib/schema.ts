import * as z from "zod";

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
