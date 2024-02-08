import React from "react";
import { selIsLoggedIn } from "../../redux/slices/authSlice";
import { useSelector } from "react-redux";

export const ShowInLogin = ({children}) => {
   const isLoggedIn = useSelector(selIsLoggedIn);
  if (isLoggedIn) {
    return <div>{children}</div>;
  } else {
    return null;
  }
};


export const ShowInLogout = ({children}) => {
  const isLoggedIn = useSelector(selIsLoggedIn);
  if (!isLoggedIn) {
    return <div>{children}</div>;
  } else {
    return null;
  }
};

