import React from "react";
import MobileNabvar from "./MobileNabvar";
import LogoutButton from "./LogoutButton";
import { auth } from "@/auth";

async function Navbar({ chatType }: { chatType: string }) {
  const session = await auth();
  console.log("session: ", session);
  console.log("id: ", session?.user?.id);
  return (
    <div className="flex items-center justify-between p-3">
      <MobileNabvar chatType={chatType} />
      <LogoutButton />
      <div className="ml-auto">userIcon</div>
    </div>
  );
}

export default Navbar;
