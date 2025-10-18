"use server";

import { makePrismaClient } from "@/lib/prisma-client";

export async function getRooms(userId: string) {
  const prisma = makePrismaClient();
  const rooms = await prisma.room.findMany({
    where: { ownerId: userId },
    select: { id: true, type: true, firstMessage: true, ownerId: true },
  });
  return rooms;
}
