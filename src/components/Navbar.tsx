import React from "react";
import MobileNabvar from "./MobileNabvar";

function Navbar({ chatType }: { chatType: string }) {
  return (
    <div className="flex items-center justify-between p-3">
      <MobileNabvar chatType={chatType} />
      <div className="ml-auto">userIcon</div>
    </div>
  );
}

export default Navbar;
