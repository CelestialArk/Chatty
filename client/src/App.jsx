import { BrowserRouter, Routes, Route } from "react-router-dom";

import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { logged } from "./context/LogContext";
import ChatPage from "./pages/ChatPage";
import { useContext, useEffect } from "react";
import UsersContext from "./context/UsersContext";

function App() {
  const isLogged = useContext(logged);
  return (
    <>
      <BrowserRouter>
        {isLogged.state ? (
          <Routes>
            <Route
              path="/"
              element={
                <UsersContext>
                  <ChatPage />
                </UsersContext>
              }
            />
          </Routes>
        ) : (
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
