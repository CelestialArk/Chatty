import io from "socket.io-client";

const URL = "http://localhost:7789";

export const socket = io.connect(URL);
