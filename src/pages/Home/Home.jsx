import { useContext } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FeedCard } from "../../components/FeedCard/FeedCard";
import { SuggestedUser } from "../../components/SuggestedUser/SuggestedUser";
import { DataContext } from "../../context/DataContext";
import { getMyPosts } from "../../utils/utils";
import { AuthContext } from "../../context/AuthContext";
import { MobileSuggestedUser } from "../../components/MobileSuggestedUser.jsx/MobileSuggestedUser";
import { useEffect } from "react";

export function Home() {
  const { user } = useContext(AuthContext);
  const { state, dispatch, setLoader } = useContext(DataContext);
  const [sort, setSort] = useState("None");
  let temproryPosts = getMyPosts(user, sort, state.posts);
  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);
  return (
    <div className="flex grow gap-4 justify-center mt-4">
      <div className="flex flex-col gap-4 w-screen  p-2 md:w-2/5  h-fit ">
        {!window.location.href.includes("/explore") && (
          <>
            <div
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
              className="flex p-1 gap-2 drop-shadow-xl shadow cursor-pointer rounded-md"
            >
              <img
                className="w-10 h-10 object-cover rounded full"
                src={user.avatarUrl}
              />
              <h2 className="grow my-auto">What's in Your Mind</h2>
              <FontAwesomeIcon icon={faPlusCircle} className="my-auto" />
            </div>

            <div className="flex gap-1 text-center">
              <h3
                onClick={() => setSort("Latest")}
                className={`w-1/2 p-2 rounded-md cursor-pointer ${
                  sort === "Latest"
                    ? "bg-primary text-white"
                    : "bg-white text-black"
                } md:hover:bg-black md:hover:text-white`}
              >
                Latest
              </h3>
              <h3
                onClick={() => setSort("Trending")}
                className={`w-1/2 p-2 rounded-md cursor-pointer ${
                  sort === "Trending"
                    ? "bg-primary text-white"
                    : "bg-white text-black"
                } md:hover:bg-black md:hover:text-white`}
              >
                Trending
              </h3>
            </div>
          </>
        )}
        <MobileSuggestedUser />
        {temproryPosts.length > 0 ? (
          temproryPosts.map(
            (
              { _id, username, content, mediaURL, likes, comments, createdAt },
              index
            ) => (
              <FeedCard
                key={index}
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
          <div className="flex h-screen  justify-center items-center text-2xl">
            No Posts
          </div>
        )}
      </div>
      <SuggestedUser />
    </div>
  );
}
