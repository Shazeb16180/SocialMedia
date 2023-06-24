import { useContext } from "react";
import { followService } from "../../services/followUnfollowService";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";

export function UserCard({ _id, username, avatarUrl, token, setUser }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center flex-shrink-0 gap-2 p-2 w-fit rounded-md border-primary border-2">
      <img
        onClick={() => navigate(`/profile/${username}`)}
        className="w-24 h-24 rounded object-cover cursor-pointer"
        src={avatarUrl}
      />
      <p
        onClick={() => navigate(`/profile/${username}`)}
        className="text-center text-2xl cursor-pointer"
      >
        {username}
      </p>
      <button
        onClick={() => {
          followService(setUser, _id, token);
        }}
        className="p-2 bg-primary text-white rounded-md hover:bg-black hover:text-white"
      >
        Follow
      </button>
    </div>
  );
}
