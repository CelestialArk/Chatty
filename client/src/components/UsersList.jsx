import { useContext, useState } from "react";
import { users } from "../context/UsersContext";

function UsersList({ changeChat }) {
  const [chat, setChat] = useState("");
  const handleChange = (value) => {
    setChat(value);
    changeChat(value);
  };

  const list = useContext(users);

  const listItems = list.map((user) => (
    <div
      onClick={() => {
        handleChange(user.friend._id);
      }}
      key={user.friend._id}
      className="w-full border-b-4 py-3 bg-white text-base-200 font-rubik-regular cursor-pointer text-center hover:bg-primary hover:text-white"
    >
      {user.friend.username}
    </div>
  ));

  return (
    <div className="h-full w-1/5 bg-white overflow-auto">
      <div className="p-6 text-center font-rubik-medium bg-primary text-white border-b-4">
        Chats
      </div>
      <div>{listItems}</div>
    </div>
  );
}

export default UsersList;
