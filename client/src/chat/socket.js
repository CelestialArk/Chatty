import io from "socket.io-client";

const URL = "https://chatty-1j2wc179e-owlden.vercel.app";

export const socket = io.connect(URL);
