import { createContext, useState } from "react";
import { useNavigate } from "react-router";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const localStorageToken = JSON.parse(localStorage.getItem("login"));
  const [token, setToken] = useState(localStorageToken?.token);
  const localStorageUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(localStorageUser?.user);
  const navigate = useNavigate();
  const loginUserHandler = async (userName, password, toast) => {
    if (userName !== "" && password !== "") {
      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: userName, password: password }),
        });
        if (response.status === 200) {
          const { foundUser, encodedToken } = await response.json();
          setToken(encodedToken);
          localStorage.setItem(
            "login",
            JSON.stringify({ token: encodedToken })
          );
          setUser(foundUser);
          localStorage.setItem("user", JSON.stringify({ user: foundUser }));
          navigate("/");
          toast.success("Logged  In");
        } else throw new Error(response.statusText);
      } catch (error) {
        toast.error("Login Error:" + error);
      }
    }
  };
  const signUpUserHandler = async (data, toast) => {
    if (data !== undefined && data !== null) {
      try {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...data }),
        });
        if (response.status === 201) {
          navigate("/login");
          toast.success("Signed Up");
        } else throw new Error(response.statusText);
      } catch (error) {
        console.log("Error in Sign Up" + error);
      }
    }
  };
  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        setUser,
        setToken,
        loginUserHandler,
        signUpUserHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
