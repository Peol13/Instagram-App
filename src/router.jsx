import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserInfo from "./components/helpers/userinfo";
import Main from "./components/pages/App/Main";
import MyProfile from "./components/pages/MyProfile/MyProfile";
import AddPost from "./components/pages/AddPost/AddPost";
import NotFound from "./components/pages/NotFound/NotFound";
import CreateProfile from "./components/pages/CreateProfile/CreateProfile";
import Login from "./components/pages/Login/Login";
import RemaindPassword from "./components/pages/remindPassword/RemindPassword";

function Router() {
  return (
    <UserInfo>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="me" element={<Login />} />
          <Route path="ca" element={<CreateProfile />} />
          <Route path="rp" element={<RemaindPassword />} />
          <Route path="ap" element={<AddPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserInfo>
  );
}

export default Router;
