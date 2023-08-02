import React, { useContext, useEffect, useState } from "react";
import { logged } from "../context/LogContext";
import axios from "axios";
import { users } from "../context/UsersContext";
import UsersList from "../components/UsersList";
import logo from "./assets/display.png";
function Chat() {
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
      <UsersList />
      <div className="flex justify-content-center">
        <div className="m-auto text-base-200 font-rubik-regular">Chat</div>
      </div>
    </div>
  );
}

export default Chat;
