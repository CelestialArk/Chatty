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
        url: "https://chatty-server-git-main-owlden.vercel.app/api/request/getAll",
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
