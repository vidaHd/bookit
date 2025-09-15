import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import "./styles/index.scss";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Booking from "./pages/Booking";
import Sign from "./pages/SignIn";
import { store } from "./store/store";
import ProfileForm from "./pages/Profile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const container = document.getElementById("root")!;
const root = createRoot(container);
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign" element={<Sign />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/profile" element={<ProfileForm />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
