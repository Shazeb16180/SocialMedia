import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faClock,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FeedCard } from "../../components/FeedCard/FeedCard";
import { useNavigate, useParams } from "react-router";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import { useEffect } from "react";
import { editUser, getAllUsers } from "../../services/userService";
import { AuthContext } from "../../context/AuthContext";
import {
  followService,
  unFollowService,
} from "../../services/followUnfollowService";
import { useState } from "react";

export function Profile() {
  const [label, setLabel] = useState("posts");
  const { username } = useParams();
  const { state, dispatch } = useContext(DataContext);
  const { user, setUser, token, setToken } = useContext(AuthContext);
  const [editProps, setEditProps] = useState({
    view: false,
    nestedView: false,
    tempUser: user,
  });
  const navigate = useNavigate();
  const myPosts = state.posts.filter(
    ({ username: dbUserName }) => username === dbUserName
  );
  const profileUser = state.users.find(
    ({ username: dbUserName }) => username === dbUserName
  );
  const loggedInUser = user.username === profileUser.username;
  const tempPost =
    label === "posts"
      ? myPosts
      : label === "bookmarks"
      ? state.posts.filter(({ _id }) => user.bookmarks.includes(_id))
      : myPosts;
  const buttonHandler = () => {
    loggedInUser
      ? (() => {
          localStorage.removeItem("login");
          localStorage.removeItem("user");
          setUser("");
          setToken("");
          dispatch({ type: "LOGOUT" });
          navigate("/");
          console.log("Done");
        })()
      : user.following.find(
          ({ username: dbUserName }) => dbUserName === profileUser.username
        )
      ? unFollowService(setUser, profileUser._id, token)
      : followService(setUser, profileUser._id, token);
  };
  const avatars = [
    "spiderman.png",
    "woman.png",
    "superman.png",
    "shield.png",
    "mother.png",
    "avatar1.jpg",
    "avatar2.jpg",
    "avatar3.jpg",
    "avatar4.jpg",
    "7309681.jpg",
  ];
  useEffect(() => {
    getAllUsers(dispatch);
  }, [user]);
  console.log("K", editProps);
  return (
    <div className="home flex flex-col grow">
      <div
        className={`${
          editProps.view ? "flex" : "hidden"
        } absolute top-0 left-0 right-0  h-screen justify-center items-center  bg-background-transparent  z-10`}
      >
        <div className="flex flex-col gap-2 p-4 bg-white w-full rounded-md md:w-1/3  border-2 border-black border-solid">
          <div className="flex gap-2">
            <p className="my-auto">Photo</p>
            <div className="relative h-12">
              <img
                src={editProps.tempUser.avatarUrl}
                className=" w-12  h-12 object-cover rounded-full"
                onClick={() =>
                  setEditProps({
                    ...editProps,
                    nestedView: !editProps.nestedView,
                  })
                }
              />
              <div
                className={`${
                  editProps.nestedView ? "flex" : "hidden"
                } absolute  flex-wrap gap-4 top-10 left-8 bg-transparent w-48 border-2 border-black border-solid `}
              >
                {avatars.map((url) => (
                  <img
                    src={`/avatar/${url}`}
                    className="w-12 h-12 object-cover rounded-full"
                    onClick={() => {
                      setEditProps({
                        ...editProps,
                        nestedView: false,
                        tempUser: {
                          ...editProps.tempUser,
                          avatarUrl: "/avatar/" + url,
                        },
                      });
                    }}
                  />
                ))}
                <div className="relative">
                  <input
                    type="file"
                    onChange={async (e) => {
                      const file = e.target.files[0];

                      const base64Promise = (file) =>
                        new Promise((resolve, reject) => {
                          const fileReader = new FileReader();
                          fileReader.readAsDataURL(file);
                          fileReader.onload = () => resolve(fileReader.result);
                          fileReader.onerror = (err) => reject(err);
                        });
                      let base64File = await base64Promise(file);
                      setEditProps({
                        ...editProps,
                        nestedView: false,
                        tempUser: {
                          ...editProps.tempUser,
                          avatarUrl: base64File,
                        },
                      });
                    }}
                    className="absolute top-0 left-0 m-0 opacity-0 rounded-full w-20 m-2"
                  />
                  <p className=" bg-primary text-white p-2 rounded-md">
                    Upload
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <p>Bio</p>
            <textarea
              className="w-full p-2 outline-none rounded-md resize-none border-2 border-grey-950"
              cols={50}
              rows={5}
              value={editProps.tempUser.bio}
              onChange={(event) =>
                setEditProps({
                  ...editProps,
                  tempUser: { ...editProps.tempUser, bio: event.target.value },
                })
              }
            ></textarea>
          </div>
          <div className="flex gap-2">
            <p>Link</p>
            <input
              value={editProps.tempUser.website}
              onChange={(event) =>
                setEditProps({
                  ...editProps,
                  tempUser: {
                    ...editProps.tempUser,
                    website: event.target.value,
                  },
                })
              }
              className="w-full rounded-md outline-none border-2 border-grey-950"
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() =>
                setEditProps({
                  view: false,
                  nestedView: false,
                  tempUser: user,
                })
              }
              className="p-2 bg-primary text-white rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                editUser(setUser, editProps.tempUser, token);
                setEditProps({
                  view: false,
                  nestedView: false,
                  tempUser: { ...editProps.tempUser },
                });
              }}
              className="p-2 bg-primary text-white rounded-md"
            >
              Update
            </button>
          </div>
        </div>
      </div>
      <div className="flex grow gap-4 justify-center mt-4">
        <div className="flex flex-col gap-4 w-screen  p-2 md:w-2/5  border-2 border-solid border-black h-fit ">
          <div className=" flex justify-center h-40 bg-primary relative">
            <img
              src={profileUser.avatarUrl}
              className="absolute -bottom-16 w-28 h-28 rounded-full object-cover"
            />
          </div>
          <div className="flex p-2">
            <div className="text-xl p-2">{profileUser.username}</div>
            {loggedInUser && (
              <div className="grow flex justify-end">
                <button
                  onClick={() => {
                    setEditProps({ ...editProps, view: true });
                  }}
                  className="p-2 bg-primary rounded-md text-white"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-2xl">{profileUser.bio}</p>
            <p className="text-1xl">{profileUser.website}</p>
            <div className="flex justify-center gap-2">
              <p>{myPosts.length} Posts</p>|
              <p>{profileUser.followers.length} Followers</p>|
              <p>{profileUser.following.length} Following</p>
            </div>

            <button
              onClick={() => buttonHandler()}
              className="p-2 mt-5 bg-primary rounded-md text-white"
            >
              {loggedInUser
                ? "LogOut"
                : user.following.find(
                    ({ username: dbUserName }) =>
                      dbUserName === profileUser.username
                  )
                ? "UnFollow"
                : "Follow"}
            </button>
          </div>
          <div className="flex p-2 gap-1">
            <div
              className={`flex gap-1 ${loggedInUser ? "w-1/3" : "w-1/2"} ${
                label === "posts"
                  ? "bg-primary text-white"
                  : "bg-white text-black"
              } justify-center p-1 rounded-md`}
              onClick={() => setLabel("posts")}
            >
              <FontAwesomeIcon className="my-auto" icon={faUpload} />
              <p>Posts</p>
            </div>
            {loggedInUser && (
              <div
                className={`flex gap-1 ${loggedInUser ? "w-1/3" : "w-1/2"} ${
                  label === "bookmarks"
                    ? "bg-primary text-white"
                    : "bg-white text-black"
                } justify-center p-1 rounded-md`}
                onClick={() => setLabel("bookmarks")}
              >
                <FontAwesomeIcon className="my-auto" icon={faBookmark} />
                <p>BookMark</p>
              </div>
            )}
            <div
              className={`flex grow gap-1${loggedInUser ? "w-1/3" : "w-1/2"} 
              ${
                label === "activity"
                  ? "bg-primary text-white"
                  : "bg-white text-black"
              } justify-center p-1 rounded-md`}
              onClick={() => setLabel("activity")}
            >
              <FontAwesomeIcon className="my-auto" icon={faClock} />
              <p>Activities</p>
            </div>
          </div>
          {tempPost.length > 0 ? (
            tempPost.map(
              ({
                _id,
                username,
                content,
                mediaURL,
                likes,
                comments,
                createdAt,
              }) => (
                <FeedCard
                  _id={_id}
                  username={username}
                  content={content}
                  mediaURL={mediaURL}
                  likes={likes}
                  comments={comments}
                  createdAt={createdAt}
                />
              )
            )
          ) : (
            <div className=" text-center h-screen capitalize">No {label}</div>
          )}
        </div>
      </div>
    </div>
  );
}
