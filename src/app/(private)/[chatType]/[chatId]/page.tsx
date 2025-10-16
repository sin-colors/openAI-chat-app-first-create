import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

// ChatTypePage同様、後で修正。
const allowedRoutes = [
  "conversation",
  "image_generation",
  "text_to_speech",
  "speech_to_text",
  "image_analysis",
];

async function ChatRoomPage({
  params,
}: {
  params: Promise<{ chatType: string }>;
}) {
  const session = await auth();
  if (!session) return redirect("/login?error_code=loginRequired");
  const { chatType } = await params;
  if (!allowedRoutes.includes(chatType))
    return redirect("/conversation?error_code=pageNotFound");
  return <div>ChatRoomPage: {chatType}ページ</div>;
}

export default ChatRoomPage;
