import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faEarth,
  faHome,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { Account } from "../Account/Account";
import { useNavigate } from "react-router";
import { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";

export function Header() {
  const navigate = useNavigate();
  const { state } = useContext(DataContext);
  const [searchData, setSearchData] = useState({ visibile: false, data: "" });
  return (
    <nav className="flex flex-col w-full sticky top-0 min h-20 sm:18 left-0 right-0 leading-10 z-40 dark:bg-dark-background border-b bg-primary text-white ">
      <div className="flex justify-between gap-2 relative items-center p-4 sm:p-2   h-full">
        <header
          className="flex flex-col md:flex-row md:gap-2 items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            className="h-12 sm:h-10 max-w-full align-middle"
            src="/images/header-logo.svg"
            alt="App logo"
          />
          <p className="leading-none text-center mb-1">Let's Connect</p>
        </header>
        <div className="flex gap-2 p-2 rounded-md w-32 md:w-80 bg-white border-2 border-solid border-black">
          <input
            value={searchData.data}
            onChange={(e) => {
              setSearchData({
                data: e.target.value.toLowerCase(),
                visibile: true,
              });
            }}
            className="outline-none text-black w-20 md:w-80"
          />
          <div
            className="cursor-pointer flex items-center"
            // onClick={() => setShowSearchbar(true)}
            title="search"
          >
            {searchData.visibile ? (
              <FontAwesomeIcon
                onClick={() => setSearchData({ visibile: false, data: "" })}
                icon={faClose}
                color="black"
              />
            ) : (
              <FontAwesomeIcon icon={faSearch} color="black" />
            )}
          </div>
        </div>
        <ul className="text-primary flex items-center gap-5 text-2xl text-white sm:text-xl">
          <li
            className="cursor-pointer flex items-center"
            onClick={() => navigate("/explore")}
            title="Explore"
          >
            <FontAwesomeIcon icon={faEarth} />
          </li>
          <li
            className="cursor-pointer flex items-center"
            onClick={() => navigate("/")}
            title="Home"
          >
            <FontAwesomeIcon icon={faHome} />
          </li>

          <Account />
        </ul>
      </div>
      <div
        className={`${
          searchData.visibile ? "flex" : "hidden"
        } justify-center gap-2 `}
      >
        <div className="bg-white w-52 p-2 border-2 border-black border-solid">
          {state.users
            .filter(({ username }) => username.includes(searchData.data))
            .map((user, index) => (
              <div
                key={index}
                onClick={() => {
                  setSearchData({ visibile: false, data: "" });
                  navigate(`/profile/${user.username}`);
                }}
                className="flex gap-2 cursor-pointer border-b-2 border-b-black border-solid"
              >
                <img
                  src={user.avatarUrl}
                  className="w-8 h-8 object-cover rounded-full my-auto"
                />
                <p className="text-black ">{user.username}</p>
              </div>
            ))}
        </div>
      </div>
    </nav>
  );
}
