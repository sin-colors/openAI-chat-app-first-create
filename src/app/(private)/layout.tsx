import React from "react";

function ChatAppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-full">
      <div className="hidden bg-red-500 lg:block lg:w-1/5">Sidebar</div>
      <main className="w-full bg-blue-500 lg:w-4/5">{children}</main>
    </div>
  );
}

export default ChatAppLayout;
