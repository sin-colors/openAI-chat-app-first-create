import { getRooms } from "@/actions/room";
import { auth } from "@/auth";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  children: React.ReactNode;
  params: Promise<{ chatType: string }>;
}

async function ChatAppLayout({ children, params }: Props) {
  const { chatType } = await params;
  const session = await auth();
  if (!session) return redirect("/login?error_code=loginRequired");

  const userId = session.user?.id;
  if (!userId) return redirect("/login?error_code=loginRequired");

  const rooms = await getRooms(userId);
  return (
    <div className="flex h-full">
      <div className="hidden bg-red-500 lg:block lg:w-1/5">
        <Sidebar rooms={rooms} />
      </div>
      <main className="flex h-full w-full flex-col bg-blue-500 lg:w-4/5">
        <Navbar chatType={chatType} />
        {children}
      </main>
    </div>
  );
}

export default ChatAppLayout;
