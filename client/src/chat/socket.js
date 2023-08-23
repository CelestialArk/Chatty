import io from "socket.io-client";

const URL = "https://chatty-server-x4l12hdpd-owlden.vercel.app";

export const socket = io.connect(URL);
