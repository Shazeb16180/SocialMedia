import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { DataContext } from "../../context/DataContext";
import { useEffect } from "react";
import { getUnFollowedUsers } from "../../utils/utils";
import { getAllUsers } from "../../services/userService";
import { UserCard } from "../UseCard.jsx/UserCard";

export function MobileSuggestedUser() {
  const { state, dispatch } = useContext(DataContext);
  const { token, user, setUser } = useContext(AuthContext);
  useEffect(() => {
    getAllUsers(dispatch);
  }, []);
  const unFollowers = getUnFollowedUsers(user, state.users);
  return (
    <div className="flex gap-2 p-2 w-full flex-shrink-0  overflow-x-scroll md:hidden border-2  border-primary">
      {unFollowers.map(({ _id, username, avatarUrl }, index) => (
        <UserCard
          key={index}
          _id={_id}
          username={username}
          avatarUrl={avatarUrl}
          token={token}
          setUser={setUser}
        />
      ))}
    </div>
  );
}
