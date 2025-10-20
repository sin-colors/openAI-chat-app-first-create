"use client";
import {
  Ellipsis,
  FileImage,
  FileOutput,
  FileSearch2,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RoomValue } from "@/lib/schema";
import { usePathname } from "next/navigation";

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

function Sidebar({ rooms }: { rooms: RoomValue[] }) {
  console.log("sidebar-called!");
  const pathname = usePathname();
  const chatType = pathname.split("/")[1];
  const chatId = pathname.split("/")[2];
  return (
    <div className="flex h-full flex-col space-y-4 bg-gray-900 p-3 text-white">
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
        {routes.map((route) => {
          // console.log("route.href", route.href);
          // console.log("chatType", chatType);
          // console.log(`/${chatType}`);
          return (
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
          );
        })}
      </div>
      <div className="flex flex-col overflow-hidden">
        <h2 className="px-2 py-4 text-sm font-medium">チャット履歴</h2>
        <div className="overflow-auto">
          {rooms.map((room) => (
            <div
              id="abc"
              key={room.id}
              className="flex w-full items-center justify-between"
            >
              <Link
                href={`/${room.type}/${room.id}`}
                className={cn(
                  "block min-w-0 flex-1 rounded-md p-2 font-medium text-zinc-300 transition hover:bg-white/10 hover:text-white",
                  room.id === chatId ? "bg-white/10 text-white" : "",
                )}
              >
                <p className="truncate font-medium">message</p>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger className="rounded-md p-2 font-medium text-zinc-300 transition hover:bg-white/10 hover:text-white">
                  <Ellipsis size={16} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>削除</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
