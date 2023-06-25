import "./NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookBookmark,
  faCompass,
  faHeart,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
export function NavBar() {
  const { dispatch } = useContext(DataContext);
  const navigate = useNavigate();
  return (
    <div className="bg-primary whitespace-pre ">
      <div className="sticky top-24 h-fit flex-col  text-white p-6 hidden md:flex">
        <div onClick={() => navigate("/")} className="nav-link cursor-pointer">
          <FontAwesomeIcon icon={faHome} size="xl" />
          <div>
            <h4>Home</h4>
          </div>
        </div>
        <div
          onClick={() => navigate("/explore")}
          className="nav-link cursor-pointer"
        >
          <FontAwesomeIcon icon={faCompass} size="xl" />
          <div>
            <h4>Explore</h4>
          </div>
        </div>
        <div
          onClick={() => navigate("/bookmarks")}
          className="nav-link cursor-pointer"
        >
          <FontAwesomeIcon icon={faBookBookmark} size="xl" />
          <div>
            <p>Book Marks</p>
          </div>
        </div>
        <div onClick={() => navigate("/")} className="nav-link cursor-pointer">
          <FontAwesomeIcon icon={faHeart} size="xl" />
          <div>
            <h4>Liked Posts</h4>
          </div>
        </div>
        <div className="flex flex-col">
          <button
            onClick={() => {
              dispatch({
                type: "POST_MODAL",
                payload: {
                  view: true,
                  tempPost: { content: "", mediaURL: "" },
                  action: "add",
                },
              });
            }}
            className="p-4 bg-white text-black rounded-md cursor-pointer "
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
