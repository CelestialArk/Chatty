import React, { useContext, useEffect, useState } from "react";
import { logged } from "../context/LogContext";
import axios from "axios";
import UsersList from "../components/UsersList";
import logo from "./assets/display.png";
import ChatRoom from "../components/ChatRoom";
function ChatPage() {
  const data = useContext(logged);
  const [user, setUser] = useState();

  const logout = async () => {
    const response = await axios({
      method: "get",
      url: "/api/user/checkout",
    });
    alert(response.data.message);
    window.location.reload(false);
  };

  useEffect(() => {
    if (data.decoded) setUser(data.decoded);
  }, [data]);
  return (
    <div className="h-screen w-full bg-white">
      <div className="navbar bg-info shadow-xl">
        <div className="flex-1">
          <span className="flex mx-3 font-rubik-medium font-bold text-white">
            <div className="bg-white rounded-xl w-8 h-8 p-1 mr-3 shadow-xl">
              <img src={logo} />
            </div>
            <div className="grid content-center">
              <div>
                Welcome,{" "}
                <span className="hover:text-primary">
                  {user ? user.firstname : null}
                </span>
              </div>
            </div>
          </span>
        </div>
        <div className="flex-none">
          <button
            className="justify-self-end btn btn-primary font-rubik-medium text-white mx-4"
            onClick={() => {
              logout();
            }}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="w-full h-5/6 flex ">
        <UsersList />
        <div className="w-full h-full">
          <ChatRoom />
          <div className="w-full h-1/6 flex items-end bg-white">
            <input className="input input-primary w-full bg-white mx-3" />
            <button className="btn btn-primary mr-2 rounded-xl px-4">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
