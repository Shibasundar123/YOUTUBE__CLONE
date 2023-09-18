import React from "react";

const ChatMessage = ({ name, message }) => {
  return (
    <div className="flex items-center p-2">
      <img
        className="h-6"
        src="https://cdn-icons-png.flaticon.com/512/552/552721.png"
        alt="user icon"
      />
      <span className="font-bold ml-2">{name}</span>
      <span className="ml-2 text-sm">{message}</span>
    </div>
  );
};

export default ChatMessage;
