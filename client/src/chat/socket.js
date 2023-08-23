import io from "socket.io-client";

const URL = "chatty-1j2wc179e-owlden.vercel.app";

export const socket = io.connect(URL);
