import React, { useContext, useEffect, useState } from "react";
import { logged } from "../context/LogContext";
import axios from "axios";
import UsersList from "../components/UsersList";
import logo from "./assets/Logo.png";
import display from "./assets/Display.png";
import ChatRoom from "../components/ChatRoom";
import { request } from "../context/RequestContext";
import { socket } from "../chat/socket";

const sampleData = [];

function ChatPage() {
  const requests = useContext(request);
  const data = useContext(logged);
  const [user, setUser] = useState({});
  const [search, setSeearch] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState("");
  const [current, setCurrent] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    socket.emit("sendMessage", { chat, current, message });
    const response = await axios({
      method: "post",
      url: "api/chat/sendMessage",
      data: {
        id: chat,
        content: message,
        receiver: current,
      },
    });
    setMessage("");
  };

  const handleChatChange = async (chat, friend) => {
    setChat(chat);
    setCurrent(friend);
    socket.emit("joinChat", chat);
    const response = await axios({
      method: "post",
      url: "/api/chat/getChat",
      data: {
        id: chat,
      },
    });
    setMessages(response.data.chat.messages);
  };

  const searchUsers = async () => {
    if (search === "") return alert("Please enter the Username of the user");
    const response = await axios({
      method: "post",
      url: "/api/request/send",
      data: {
        receiverName: search,
      },
    });

    alert(response.data.message);
  };

  useEffect(() => {
    socket.on("getMessage", ({ current, message }) => {
      console.log("here");
      console.log(message);
    });
    socket.on("Loading", (state) => {
      if (state) {
        console.log("Typing");
        setLoading(true);
      }
    });
  }, [socket]);

  useEffect(() => {
    if (sampleData.length === 0) {
      const toRef = setTimeout(() => {
        setLoading(true);
        clearTimeout(toRef);
      }, 1000);
    }
  }, [sampleData]);

  useEffect(() => {
    if (loading) {
      const toRef = setTimeout(() => {
        setLoading(false);
        clearTimeout(toRef);
      }, 4000);
    }
  }, [loading]);

  const listItems = requests.map((item) => (
    <ul
      tabIndex={0}
      className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box"
      key={item._id}
    >
      <li className="border-b-2 p-2">
        <div className="w-full">
          <div className="w-10 rounded-full">
            <img src={display} />
          </div>
          <div className="font-rubik-medium">
            <div className="text-base-200">
              {item.sender.username}
              <div className="flex">
                <button
                  className="btn btn-success m-2"
                  onClick={() => {
                    replyRequest(true, item._id);
                  }}
                >
                  Accept
                </button>
                <button
                  className="btn btn-error m-2"
                  onClick={() => {
                    replyRequest(false, item._id);
                  }}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  ));

  const replyRequest = async (reply, id) => {
    const response = await axios({
      method: "post",
      url: "/api/request/reply",
      data: {
        id: id,
        reply: reply,
      },
    });
    alert(response.data.message);
    window.location.reload(false);
  };

  const logout = async () => {
    const response = await axios({
      method: "get",
      url: "/api/user/checkout",
    });
    alert(response.data.message);
    window.location.reload(false);
  };

  useEffect(() => {
    if (data.decoded) setUser(data.decoded);
  }, [data]);
  return (
    <div className="h-screen w-full bg-white">
      <div className="navbar bg-info shadow-2xl">
        <div className="flex-1">
          <span className="flex mx-3 font-rubik-medium font-bold text-white">
            <div className="bg-white rounded-xl w-8 h-8 p-1 mr-3 shadow-xl">
              <img src={logo} />
            </div>
            <div className="grid content-center">
              <div>
                Welcome,{" "}
                <span className="hover:text-primary">
                  {user ? user.firstname : null}
                </span>
              </div>
            </div>
          </span>
        </div>
        <div className="flex-none">
          <input
            type="text"
            placeholder="Search for Users"
            className="input input-bordered input-primary bg-white w-full max-w-xs"
            onChange={(event) => {
              setSeearch(event.target.value);
            }}
          />
          <button
            className="btn btn-ghost btn-circle"
            onClick={() => {
              searchUsers();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          <div className="dropdown dropdown-end">
            <button className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                {JSON.stringify(requests) === JSON.stringify([]) ? null : (
                  <span className="badge badge-xs badge-primary indicator-item"></span>
                )}
              </div>
            </button>
            {listItems}
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={display} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white text-base-200 rounded-box w-52"
            >
              <li>
                <a className="justify-between">Profile</a>
              </li>
              <li>
                <a
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full h-5/6 flex ">
        <UsersList changeChat={handleChatChange} />
        <div className="w-full h-full">
          <div className="h-5/6 overflow-auto bg-gray-200 rounded-xl">
            <ChatRoom messages={messages} />
            {loading ? (
              <div className="chat chat-start">
                <div className="chat-bubble bg-info text-white">
                  <span className="loading loading-dots loading-md"></span>
                </div>
              </div>
            ) : null}
          </div>

          <div className="w-full h-1/6 flex items-end bg-white">
            <input
              value={message}
              className="input input-primary w-full bg-white mx-3"
              onChange={(event) => {
                setMessage(event.target.value);
                socket.emit("Typing", true);
              }}
            />
            <button
              className="btn btn-primary mr-2 rounded-xl px-4"
              onClick={() => {
                sendMessage();
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
