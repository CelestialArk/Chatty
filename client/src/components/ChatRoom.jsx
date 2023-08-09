import React, { useContext } from "react";
import { logged } from "../context/LogContext";

function ChatRoom({ messages }) {
  const user = useContext(logged);
  const id = user.decoded.id;
  const list = messages ? messages : [];
  const messageList = list.map((message) =>
    id === message.sender ? (
      <div className="" key={message._id}>
        <div className="chat chat-end">
          <div className="chat-bubble bg-primary text-white">
            {message.content}
          </div>
        </div>
      </div>
    ) : (
      <div className="" key={message._id}>
        <div className="chat chat-start">
          <div className="chat-bubble bg-info text-white">
            {message.content}
          </div>
        </div>
      </div>
    )
  );
  return <div className="">{messageList}</div>;
}

export default ChatRoom;
