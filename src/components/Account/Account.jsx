import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { DataContext } from "../../context/DataContext";
import { toast } from "react-toastify";

export function Account() {
  const { user, setUser, setToken } = useContext(AuthContext);
  const { dispatch } = useContext(DataContext);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();
  return (
    <li className=" relative ">
      <div className="flex gap-1 flex-wrap items-center text-base border-l-2 border-primary-light pl-2">
        <img
          src={user.avatarUrl}
          alt="Profile img"
          className="w-7 h-7 object-cover hidden md:block rounded-full"
        />
        <span className="font-semibold text-white hidden md:block">
          {user.username}
        </span>
        <FontAwesomeIcon
          icon={faArrowDown}
          className="cursor-pointer"
          color="white"
          onClick={() => {
            setShowProfileDropdown(!showProfileDropdown);
          }}
        />
      </div>
      {showProfileDropdown && (
        <div className="absolute top-10 right-2 w-max text-white">
          <ul className="p-2 text-base bg-primary rounded dark:bg-dark-background-secondary drop-shadow-xl">
            <li
              className="rounded hover:bg-white hover:text-black px-2 py-1 cursor-pointer"
              onClick={() => {
                setShowProfileDropdown(!showProfileDropdown);
                navigate(`/profile/${user.username}`);
              }}
            >
              Profile
            </li>
            <li
              className="text-error rounded hover:bg-white hover:text-black px-2 py-1 cursor-pointer"
              onClick={() => {
                setShowProfileDropdown(!showProfileDropdown);
                (() => {
                  localStorage.removeItem("login");
                  localStorage.removeItem("user");
                  setUser("");
                  setToken("");
                  dispatch({ type: "LOGOUT" });
                  navigate("/");
                  toast.success("Logged Out");
                })();
              }}
            >
              Log Out
            </li>
          </ul>
        </div>
      )}
    </li>
  );
}
