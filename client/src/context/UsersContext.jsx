import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const users = createContext();

export default function UsersContext({ children }) {
  const [list, setList] = useState([]);
  useEffect(() => {
    const getList = async () => {
      const response = await axios({
        method: "get",
        url: "",
      });
    };

    getList();
  }, []);

  return <users.Provider>{children}</users.Provider>;
}
