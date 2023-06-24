import "./Login.css";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export function Login() {
  const { loginUserHandler } = useContext(AuthContext);
  const [formData, setFormData] = useState({ userName: "", password: "" });
  const location = useLocation();
  const loginHandler = ({ userName, password }) => {
    loginUserHandler(userName, password, toast, location);
  };
  return (
    <div className="login-container">
      <div className="login-logo-image">
        <img src="images/login.svg" alt="Loading" />
      </div>
      <div className="login-card-container">
        <div className="login-card">
          <div className="login-card-logo">
            <img src="images/login.svg" alt="Loading" />
          </div>
          <h1 className="text-3xl font-bold underline">Login</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              loginHandler(formData);
            }}
          >
            <div className="field">
              <h3 className="font-semibold">User Name</h3>
              <input
                placeholder="User Name"
                required={true}
                onChange={(e) =>
                  setFormData({ ...formData, userName: e.target.value })
                }
              />
            </div>
            <div className="field">
              <h3 className="font-semibold">Password</h3>
              <input
                placeholder="password"
                type="password"
                required={true}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <div className="login-button">
              <button>Login</button>
            </div>
          </form>
          <div className="login-button">
            <button
              onClick={() =>
                loginHandler({
                  userName: "adarshbalika",
                  password: "adarshBalika123",
                })
              }
            >
              Login as Guest
            </button>
          </div>
          <p>
            Don't have an account?<NavLink to={"/signup"}> Sign Up!</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
