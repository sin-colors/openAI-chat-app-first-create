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
  const { chatType } = await params;
  if (!allowedRoutes.includes(chatType)) return redirect("/");
  return <div>ChatRoomPage: {chatType}ページ</div>;
}

export default ChatRoomPage;
