import io from "socket.io-client";

const URL = "https://chatty-tau-three.vercel.app";

export const socket = io.connect(URL);
