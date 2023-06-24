import "../Login/Login.css";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
export function SignUp() {
  const { signUpUserHandler } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  const signUpHandler = (data) => {
    signUpUserHandler(data);
  };
  return (
    <div className="login-container">
      <div className="login-card-container">
        <div className="login-card">
          <div className="login-card-logo">
            <img src="images/login.svg" alt="Loading" />
          </div>
          <h1 className="text-3xl font-bold underline">Sign Up</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              signUpHandler(formData);
            }}
          >
            <div className="field signup">
              <div>
                <h3 className="font-semibold">First Name</h3>
                <input
                  placeholder="First Name"
                  required={true}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              </div>
              <div>
                <h3 className="font-semibold">Last Name</h3>
                <input
                  placeholder="Last Name"
                  required={true}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="field">
              <h3 className="font-semibold">User Name Or Email</h3>
              <input
                placeholder="example@example.com"
                required={true}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
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
              <button>Sign Up</button>
            </div>
          </form>
          <p>
            Already have an account?<NavLink to="/login">Log In</NavLink>
          </p>
        </div>
      </div>
      <div className="login-logo-image">
        <img src="images/login.svg" alt="Loading" />
      </div>
    </div>
  );
}
