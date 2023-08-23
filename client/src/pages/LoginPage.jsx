import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const login = async () => {
    const response = await axios({
      method: "post",
      url: "https://chatty-tau-three.vercel.app/api/user/signin",
      data: {
        email: email,
        password: password,
      },
    });
    alert(response.data.message);
    if (response.data.state) {
      navigate("/");
      window.location.reload(false);
    }
  };
  return (
    <div className="flex justify-content-center h-screen w-full bg-gradient-to-r from-primary to-info">
      <div className="m-auto card bg-white shadow-xl">
        <div className="card-title font-rubik-medium text-base-200 p-4 text-4xl font-bold text-center">
          <span className="w-full text-center">Sign in to your account</span>
        </div>
        <div className="card-body">
          <div className="my-2">
            <label className="label">
              <span className="label-text font-rubik-regular text-base-200">
                Email
              </span>
            </label>
            <input
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              className="input input-primary bg-white w-full placeholder:font-rubik-light "
              placeholder="Enter your email address"
            />
            <div className="my-2">
              <label className="label">
                <span className="label-text font-rubik-regular text-base-200">
                  Password
                </span>
              </label>
              <input
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                type="password"
                className="input input-primary w-full bg-white placeholder:font-rubik-light"
                placeholder="Enter your password"
              />
            </div>
            <div className="my-4">
              <button
                className="btn btn-primary w-full mb-2"
                onClick={() => {
                  login();
                }}
              >
                Login
              </button>
              <span className="text-base-100 font-rubik-medium">
                Don't have an account?{" "}
              </span>
              <Link
                to="/register"
                className="underline font-rubik-medium text-gray-300 hover:text-info"
              >
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
