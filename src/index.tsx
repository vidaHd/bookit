import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";

import "./styles/index.scss";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Booking from "./pages/Booking";
import Sign from "./pages/SignIn";
import { store } from "./store/store";
import { AppInitializer } from "./App";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppInitializer>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign" element={<Sign />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </BrowserRouter>
      </AppInitializer>
    </Provider>
  </React.StrictMode>
);
