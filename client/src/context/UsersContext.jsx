import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { logged } from "./LogContext";

export const users = createContext();

export default function UsersContext({ children }) {
  const [list, setList] = useState([]);
  useEffect(() => {
    const getList = async () => {
      const response = await axios({
        method: "get",
        url: "/api/user/getAll",
        withCredentials: true,
      });
      setList(response.data.users);
    };

    getList();
  }, []);

  return <users.Provider value={list}>{children}</users.Provider>;
}
