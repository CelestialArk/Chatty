import { BrowserRouter, Routes, Route } from "react-router-dom";

import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { logged } from "./context/LogContext";
import Chat from "./pages/Chat";
import { useContext, useEffect } from "react";

function App() {
  const isLogged = useContext(logged);
  useEffect(() => {
    console.log(isLogged);
  }, [isLogged]);
  return (
    <>
      <BrowserRouter>
        {isLogged ? (
          <Routes>
            <Route path="/" element={<Chat />} />
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
