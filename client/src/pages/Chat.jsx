import React, { useContext, useEffect, useState } from "react";
import { logged } from "../context/LogContext";
import axios from "axios";
import { users } from "../context/UsersContext";
import UsersList from "../components/UsersList";

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
      <div className="navbar bg-white shadow-xl">
        <div className="flex-1">
          <span className="text-base-200 mx-3 font-rubik-regular">
            Welcome,{" "}
            <span className="hover:text-primary">
              {user ? user.firstname : null}
            </span>
          </span>
        </div>
        <div className="flex-none">
          <button
            className="justify-self-end btn btn-error font-rubik-medium text-white mx-4"
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
