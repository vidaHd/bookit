import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import "./styles/index.scss";
import Booking from "./pages/reserveTime/Booking";
import { store } from "./store/store";
import ProfileForm from "./pages/Profile/Profile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MainLayout } from "./layouts";
import Welcome from "./pages/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/register/Register";
import { AppProvider } from "./context/LanguageContext";
import "./i18n";
import AddNewCompany from "./pages/AddNewCompany/AddNewCompany";
import AddedService from "./pages/AddedService/AddedService";
import AddUserService from "./pages/AddUserService/AddUserService";
import AddAvailableTime from "./pages/AddAvailableTime/AddAvailableTime";
import "react-datepicker/dist/react-datepicker.css";

const container = document.getElementById("root")!;
const root = createRoot(container);
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route element={<MainLayout />}>
                <Route path="/" element={<Welcome />} />
                <Route path="/reserveTime" element={<Booking />} />
                <Route path="/profile" element={<ProfileForm />} />
                <Route path="/add-new-company" element={<AddNewCompany />} />
                <Route path="/add-new-service" element={<AddedService />} />
                <Route path="/add-user-service" element={<AddUserService />} />
                <Route path="/available-time" element={<AddAvailableTime />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AppProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
);
