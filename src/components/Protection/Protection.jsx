import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate, useLocation } from "react-router";

export function Protection({ children }) {
  const { token } = useContext(AuthContext);
  const location = useLocation();
  return token ? children : <Navigate state={location} to={"/login"} />;
}
