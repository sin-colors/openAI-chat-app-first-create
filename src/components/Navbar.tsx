import React from "react";
import MobileNabvar from "./MobileNabvar";
import LogoutButton from "./LogoutButton";

function Navbar({ chatType }: { chatType: string }) {
  return (
    <div className="flex items-center justify-between p-3">
      <MobileNabvar chatType={chatType} />
      <LogoutButton />
      <div className="ml-auto">userIcon</div>
    </div>
  );
}

export default Navbar;
