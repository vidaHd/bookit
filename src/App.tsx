import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserName } from "./slices/userSlice";

export const AppInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      dispatch(setUserName(user));
    }
  }, [dispatch]);

  return <>{children}</>;
};
