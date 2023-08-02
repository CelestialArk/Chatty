import { useContext } from "react";
import { users } from "../context/UsersContext";

function UsersList() {
  const list = useContext(users);

  const listItems = list.map((user) => (
    <div
      key={user._id}
      className="w-full border-b-4 py-3 text-base-200 font-rubik-regular cursor-pointer text-center hover:bg-primary hover:text-white"
    >
      {user.username}
    </div>
  ));
  return <div className="h-full shadow-xl w-1/5">{listItems}</div>;
}

export default UsersList;
