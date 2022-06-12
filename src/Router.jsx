import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MyProfile from 'components/pages/myprofile/MyProfile';
import NotFound from 'components/pages/notfound/NotFound';
import Dashboard from 'components/pages/dashboard/Dashboard';
import Login from 'components/pages/login/Login';
import Register from 'components/pages/register/Register';
import RemindPassword from 'components/pages/remind-password/RemindPassword';
import Addpost from 'components/pages/Addpost/Addpost';
import { MainContextProvider } from 'components/contexts/main';
import Home from './components/pages/home/Home';


function Router() {
  return (
    <MainContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="login" element={<Login />} />
        <Route path="addpost" element={<Addpost />} />
        <Route path="register" element={<Register />} />
        <Route path="remind-password" element={<RemindPassword />} />
        <Route path="me" element={<MyProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </MainContextProvider>
  );
}

export default Router;
