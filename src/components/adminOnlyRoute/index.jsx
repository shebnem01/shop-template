import React from "react";
import { selEmail } from "../../redux/slices/authSlice";
import { useSelector } from "react-redux";

export const AdminOnlyRoute = ({ children }) => {
  const email = useSelector(selEmail);

  if (email === "rshebnem01@gmail.com") {
    return <div>{children}</div>;
  }
  return <section>Permisson denied</section>;
};
export const AdminOnlyLink = ({ children }) => {
  const email = useSelector(selEmail);

  if (email === "rshebnem01@gmail.com") {
    return <div>{children}</div>;
  }
  return null;
};
