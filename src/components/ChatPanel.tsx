import { RoomTypeValues } from "@/lib/schema";
import Image from "next/image";
import React from "react";

interface Props {
  chatType: RoomTypeValues;
}

function ChatPanel({ chatType }: Props) {
  function chatPanelConfig() {
    let imageUrl;
    let message;
    switch (chatType) {
      case "conversation":
        imageUrl = "/conversation_panel.svg";
        message = "会話を始めよう";
        break;
      case "image_generation":
        imageUrl = "/image_generation_panel.svg";
        message = "画像を生成しよう";
        break;
      case "text_to_speech":
        imageUrl = "/text_to_speech_panel.svg";
        message = "テキストを音声に変換しよう";
        break;
      case "speech_to_text":
        imageUrl = "/speech_to_text_panel.svg";
        message = "音声をテキストに変換しよう";
        break;
      case "image_analysis":
        imageUrl = "/image_analysis_panel.svg";
        message = "画像を解析しよう";
        break;
    }
    return { imageUrl, message };
  }
  const { imageUrl, message } = chatPanelConfig();
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center">
      <div className="relative h-72 w-72">
        <Image alt="..." src={imageUrl} fill priority />
      </div>
      <p className="mt-2 text-center text-xl">{message}</p>
    </div>
  );
}

export default ChatPanel;
