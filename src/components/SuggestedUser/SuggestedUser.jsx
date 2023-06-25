import { useContext } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { DataContext } from "../../context/DataContext";
import { getAllUsers } from "../../services/userService";
import { useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getUnFollowedUsers } from "../../utils/utils";
import { followService } from "../../services/userService";

export function SuggestedUser() {
  const { state, dispatch } = useContext(DataContext);
  const { token, user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    getAllUsers(dispatch);
  }, []);
  const unFollowers = getUnFollowedUsers(user, state.users);
  return (
    <div className=" flex-col gap-4 p-4 h-96 overflow-y-auto overflow-x-hidden scroll-smooth  sticky top-24 hidden md:flex rounded-md border-2 border-primary">
      <h2 className="text-xl underline">Suggested Users</h2>
      {unFollowers.map(({ _id, username, avatarUrl }) => (
        <div className="flex flex-col p-2 shadow-md">
          <div className="flex  justify-between">
            <div
              onClick={() => navigate(`/profile/${username}`)}
              className="flex justify-between gap-1 cursor-pointer"
            >
              <img
                className="w-7 h-7 object-cover rounded-full m-0"
                src={avatarUrl}
              />
              <p className="m-0">{username}</p>
            </div>
            <button
              onClick={() => {
                followService(setUser, _id, token, toast);
              }}
              className="p-1 rounded-md bg-primary text-white"
            >
              Follow
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
