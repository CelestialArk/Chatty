import { createContext, useState, useEffect } from "react";

import axios from "axios";

export const logged = createContext();

export default function LogContext({ children }) {
  const [isLogged, setIsLogged] = useState({
    message: "Nothing yet",
    state: false,
  });
  useEffect(() => {
    const check = async () => {
      const response = await axios({
        method: "get",
        url: import.meta.env.VITE_ORIGIN + "/api/user/check",
        withCredentials: true,
      });
      setIsLogged(response.data);
    };

    check();
  }, []);

  return <logged.Provider value={isLogged}>{children}</logged.Provider>;
}
