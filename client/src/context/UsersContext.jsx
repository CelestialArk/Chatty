import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { socket } from "../chat/socket";

export const users = createContext();

export default function UsersContext({ children }) {
  const getList = async () => {
    const response = await axios({
      method: "get",
      url: "/api/user/getAll",
      withCredentials: true,
    });
    setList(response.data.users);
  };
  const [list, setList] = useState([]);
  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    socket.on("check", (state) => {
      if (state) {
        getList();
      }
    });
  }, [socket]);

  return <users.Provider value={list}>{children}</users.Provider>;
}
