import React from "react";

function Chat() {
  return (
    <div className="h-screen w-full bg-white">
      <div className="navbar bg-white shadow-xl">
        <div className="flex-1">
          <span className="text-base-200 mx-3">Welcome,</span>
        </div>
        <div className="flex-none">
          <button className="justify-self-end btn btn-error font-rubik-medium text-white mx-4">
            Logout
          </button>
        </div>
      </div>
      <div className="flex justify-content-center">
        <div className="m-auto text-base-200 font-rubik-regular">Chat</div>
      </div>
    </div>
  );
}

export default Chat;
