import {
  FileImage,
  FileOutput,
  FileSearch2,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

const routes = [
  {
    label: "Conversation",
    href: "/conversation",
    color: "text-violet-500",
    icon: MessageCircle,
  },
  {
    label: "Image Generation",
    href: "/image_generation",
    color: "text-blue-500",
    icon: FileImage,
  },
  {
    label: "Text to Speech",
    href: "/text_to_speech",
    color: "text-red-500",
    icon: FileOutput,
  },
  {
    label: "Speech to Text",
    href: "/speech_to_text",
    color: "text-green-500",
    icon: MessageCircle,
  },
  {
    label: "Image Analysis",
    href: "/image_analysis",
    color: "text-orange-500",
    icon: FileSearch2,
  },
];

function Sidebar({ chatType }: { chatType: string }) {
  return (
    <div className="h-full space-y-4 bg-gray-900 p-3 text-white">
      <Link href="/" className="flex items-center pr-1">
        <div className="mr-3">
          <Avatar>
            <AvatarImage src="/ai_logo.svg" />
            <AvatarFallback className="text-gray-900">AI</AvatarFallback>
          </Avatar>
        </div>
        <h1 className="text-2xl font-bold">AI Chat App</h1>
      </Link>
      <div className="space-y-1">
        {routes.map((route) => (
          <Link
            href={route.href}
            key={route.href}
            className={cn(
              "block rounded-md p-2 font-medium text-zinc-300 transition hover:bg-white/10 hover:text-white",
              route.href === `/${chatType}` ? "bg-white/10 text-white" : "",
            )}
          >
            <div className="flex items-center">
              <route.icon className={cn("mr-2 h-5 w-5", route.color)} />
              <p>{route.label}</p>
            </div>
          </Link>
        ))}
      </div>
      <div>チャットルームエリア</div>
    </div>
  );
}

export default Sidebar;
