import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const request = createContext();

const RequestContext = ({ children }) => {
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    const getRequests = async () => {
      const response = await axios({
        method: "get",
        url: "/api/request/getAll",
        withCredentials: true,
      });
      setRequests(response.data.requests);
    };
    getRequests();
  }, []);
  return <request.Provider value={requests}>{children}</request.Provider>;
};

export default RequestContext;
