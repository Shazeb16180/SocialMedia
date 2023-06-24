import { useContext } from "react";
import { FeedCard } from "../../components/FeedCard/FeedCard";
import { DataContext } from "../../context/DataContext";
import { AuthContext } from "../../context/AuthContext";
import { useEffect } from "react";

export function BookMarks() {
  const { user } = useContext(AuthContext);
  const { state, setLoader } = useContext(DataContext);
  let temproryPosts = state.posts.filter(({ _id }) =>
    user.bookmarks.includes(_id)
  );
  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);
  return (
    <div className="flex grow gap-4 justify-center mt-4">
      <div className="flex flex-col justify-center w-screen gap-2 p-2 md:w-2/5 h-fit">
        <p className="text-2xl p-2 text-center underline">BookMarks</p>
        <div className="flex flex-col gap-4 w-screen  p-2 md:w-full h-fit ">
          {temproryPosts.length > 0 ? (
            temproryPosts.map(
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
            <div className="flex h-screen  justify-center items-center text-2xl">
              No BookMarks
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
