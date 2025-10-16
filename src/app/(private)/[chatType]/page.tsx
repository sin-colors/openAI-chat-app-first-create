import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

// 後で修正。必要なくなる予定。
const allowedRoutes = [
  "conversation",
  "image_generation",
  "text_to_speech",
  "speech_to_text",
  "image_analysis",
];

async function ChatTypePage({
  params,
}: {
  params: Promise<{ chatType: string }>;
}) {
  const session = await auth();
  if (!session) return redirect("/login?error_code=loginRequired");
  const { chatType } = await params;
  if (!allowedRoutes.includes(chatType))
    return redirect("/conversation?error_code=pageNotFound");
  return <div>ChatTypePage: {chatType}ページ</div>;
}

export default ChatTypePage;
