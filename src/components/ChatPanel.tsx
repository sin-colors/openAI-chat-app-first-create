import { RoomTypeValues } from "@/lib/schema";
import React from "react";

interface Props {
  chatType: RoomTypeValues;
}

function ChatPanel({ chatType }: Props) {
  return <div>ChatPanel</div>;
}

export default ChatPanel;
