import io from "socket.io-client";

const URL = "https://chatty-server-git-main-owlden.vercel.app";

export const socket = io.connect(URL);
