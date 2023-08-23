import io from "socket.io-client";

const URL = "https://chatty-server-2j1zhoqkw-owlden.vercel.app";

export const socket = io.connect(URL);
