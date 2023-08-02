import { useContext } from "react";
import { users } from "../context/UsersContext";

function UsersList() {
  const list = useContext(users);

  const listItems = list.map((user) => (
    <div
      key={user._id}
      className="w-full border-b-4 py-3 shadow-xl bg-white text-base-200 font-rubik-regular cursor-pointer text-center hover:bg-primary hover:text-white"
    >
      {user.username}
    </div>
  ));
  return (
    <div className="h-full w-1/5 bg-white">
      <div className="p-6 text-center font-rubik-medium bg-primary text-white border-b-4 ">
        Users
      </div>
      <div>{listItems}</div>
    </div>
  );
}

export default UsersList;
