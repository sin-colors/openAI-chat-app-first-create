import { Prisma, PrismaClient } from "@/generated/prisma";
import { DefaultArgs } from "@/generated/prisma/runtime/library";

let browserPrismaClient:
  | PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
  | undefined = undefined;

export function makePrismaClient() {
  if (typeof window !== undefined) {
    // クライアントサイドの場合
    if (!browserPrismaClient) {
      browserPrismaClient = new PrismaClient();
    }
    return browserPrismaClient;
  } else {
    // サーバーサイドの場合
    if (process.env.NODE_ENV === "development") {
      // 開発環境の場合
      if (!browserPrismaClient) {
        browserPrismaClient = new PrismaClient();
      }
      return browserPrismaClient;
    }
    return new PrismaClient();
  }
}
