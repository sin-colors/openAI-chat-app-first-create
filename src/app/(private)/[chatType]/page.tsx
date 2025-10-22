import { auth } from "@/auth";
import ChatForm from "@/components/ChatForm";
import ChatPanel from "@/components/ChatPanel";
import { roomTypeSchema, RoomTypeValues } from "@/lib/schema";
import { redirect } from "next/navigation";
import React from "react";

// 後で修正。必要なくなる予定。
// const allowedRoutes = [
//   "conversation",
//   "image_generation",
//   "text_to_speech",
//   "speech_to_text",
//   "image_analysis",
// ];

interface Props {
  params: Promise<{ chatType: RoomTypeValues }>;
}

async function ChatTypePage({ params }: Props) {
  const session = await auth();
  if (!session) return redirect("/login?error_code=loginRequired");
  const { chatType } = await params;
  if (!roomTypeSchema.safeParse(chatType).success)
    return redirect("/conversation?error_code=pageNotFound");
  // if (!allowedRoutes.includes(chatType))
  //   return redirect("/conversation?error_code=pageNotFound");
  return (
    <>
      <ChatPanel chatType={chatType} />
      <ChatForm />
    </>
  );
}

export default ChatTypePage;
