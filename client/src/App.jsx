import { BrowserRouter, Routes, Route } from "react-router-dom";

import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { logged } from "./context/LogContext";
import ChatPage, { SearchResult } from "./pages/ChatPage";
import { useContext, useEffect } from "react";
import UsersContext from "./context/UsersContext";
import RequestContext from "./context/RequestContext";
import SearchPage from "./pages/SearchPage";

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
                  <RequestContext>
                    <ChatPage />
                  </RequestContext>
                </UsersContext>
              }
            />
            <Route
              path="/search"
              element={
                <SearchResult>
                  <SearchPage />
                </SearchResult>
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
