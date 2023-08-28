import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { socket } from "../chat/socket";

export const request = createContext();

const RequestContext = ({ children }) => {
  const [update, setUpdate] = useState(false);
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    const getRequests = async () => {
      const response = await axios({
        method: "get",
        url: import.meta.env.VITE_SERVER_URL + "/api/request/getAll",
        withCredentials: true,
      });
      setRequests(response.data.requests);
    };
    getRequests();
  }, [update]);

  useEffect(() => {
    socket.on("gotRequest", (state) => {
      console.log("yes");
      setUpdate(!update);
    });
  }, [socket]);
  return <request.Provider value={requests}>{children}</request.Provider>;
};

export default RequestContext;
