import { Menu } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

function Navbar() {
  return (
    <div>
      <Button
        size="icon"
        variant="ghost"
        className="cursor-pointer hover:bg-transparent lg:hidden"
      >
        <Menu />
      </Button>
      <div className="ml-auto">userIcon</div>
    </div>
  );
}

export default Navbar;
