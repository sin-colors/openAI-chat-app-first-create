import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginFormSchema } from "./lib/schema";
import {
  InvalidPasswordError,
  MissingCredentialsError,
  UserNotFoundError,
} from "./lib/auth-error";
// import { PrismaClient } from "./generated/prisma";
import { compare } from "bcryptjs";
import { makePrismaClient } from "./lib/prisma-client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // デフォルトエクスポートなので手動でインポートする必要がある
    Credentials({
      name: "Credentials",
      authorize: async (credentials) => {
        console.log("authorize!!");
        try {
          // safeParseは{successs: true, data: ...}or{success: false, error: ...}を返す
          const validatedCredentials = loginFormSchema.safeParse(credentials);
          if (!validatedCredentials.success) throw new Error();
          const email = validatedCredentials.data?.email;
          const password = validatedCredentials.data?.password;
          // emailまたはpasswordがない場合
          if (!email || !password) throw new MissingCredentialsError();
          const prisma = makePrismaClient();
          // emailを用いてデータベースからユーザーを取得
          const user = await prisma.user.findUnique({ where: { email } });
          // ユーザーが取得できなかった場合
          if (!user) throw new UserNotFoundError();
          // ユーザーは見つかったがパスワードが登録されていない場合
          if (!user.password) throw new InvalidPasswordError();
          // 入力されたパスワード(password)とデータベースに保存されているハッシュ化されたパスワード(user.password)を比較する。返り値はtrueまたはfalse。
          const isMatched = await compare(password, user.password);
          // 一致しなかった場合
          if (!isMatched) throw new InvalidPasswordError();
          console.log("userData-before");
          // 一致した場合はユーザーのデータを返り値として返す
          const userData = {
            name: user.name,
            email: user.email,
            id: user.id,
          };
          console.log("userData-after");
          console.log("userData-return-auth: ", userData);
          return userData;
        } catch (err) {
          console.error("authorize-error", err);
          // エラーが発生したときはエラーを再スロー
          // サーバーアクション内でキャッチして処理する
          throw err;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token.id && typeof token.id === "string") {
        session.user.id = token.id;
      }
      return session;
    },
  },
});
