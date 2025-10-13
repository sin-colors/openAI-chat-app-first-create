import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import React from "react";

interface Props {
  children: React.ReactNode;
  params: Promise<{ chatType: string }>;
}

async function ChatAppLayout({ children, params }: Props) {
  const { chatType } = await params;
  return (
    <div className="flex h-full">
      <div className="hidden bg-red-500 lg:block lg:w-1/5">
        <Sidebar chatType={chatType} />
      </div>
      <main className="flex h-full w-full flex-col bg-blue-500 lg:w-4/5">
        <Navbar chatType={chatType} />
        {children}
      </main>
    </div>
  );
}

export default ChatAppLayout;
