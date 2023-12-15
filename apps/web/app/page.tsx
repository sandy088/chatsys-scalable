'use client'
import { useState } from "react";
import { useSocket } from "../context/SocketProvider";

export default function Page(): JSX.Element {
  const {sendMessage} = useSocket();
  const [message, setMessage] = useState("")

  return (
   <div>
    <h1>Chat</h1>
    <input onChange={(e)=> setMessage(e.target.value)} type="text" />
    <button onClick={() => sendMessage(message)}>Send</button>
   </div>
  );
}
