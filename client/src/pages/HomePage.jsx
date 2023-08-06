import Logo from "./assets/Logo.png";

import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="flex justify-content-center h-screen bg-gradient-to-r from-primary to-info">
      <div className="m-auto">
        <div className="card lg:card-side bg-base-200 shadow-xl bg-white grid-cols-2">
          <div className="flex p-4 bg-gray-100 rounded-xl">
            <div className="m-auto">
              <img src={Logo} className="place-self-center" />
            </div>
            <div className="flex justify-content-center">
              <div className="m-auto ">
                <div className="flex flex-col">
                  <span className="font-rubik-medium font-bold text-5xl text-base-200 my-1">
                    Chatty
                  </span>
                  <span className="font-rubik-light text-base-200 font-bold">
                    Your private messaging app
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="card-title p-4 text-base-200 font-rubik-regular">
              Welcome to the Chatty Homepage
            </div>
            <div className="justify-content-center w-full my-5">
              <div className="m-auto p-4">
                <Link
                  to="/register"
                  className="btn btn-info font-rubik-light w-full text-white"
                >
                  Sign Up Now
                </Link>
              </div>
              <div className="m-auto p-4">
                <Link
                  to="/login"
                  className="btn btn-outline btn-primary font-rubik-light w-full"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
