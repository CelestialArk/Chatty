import { createContext, useState, useEffect } from "react";

import axios from "axios";

export const logged = createContext();

export default function LogContext({ children }) {
  const [isLogged, setIsLogged] = useState();
  useEffect(() => {
    const check = async () => {
      const response = await axios({
        method: "get",
        url: "/api/user/check",
        withCredentials: true,
      });
      setIsLogged(response.data.state);
    };

    check();
  });

  return <logged.Provider value={isLogged}>{children}</logged.Provider>;
}
