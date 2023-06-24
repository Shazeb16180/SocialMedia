import { useContext } from "react";
import { useParams } from "react-router";
import {
  faArrowDown,
  faArrowUp,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FeedCard } from "../../components/FeedCard/FeedCard";
import { DataContext } from "../../context/DataContext";
export function Post() {
  const { postId } = useParams();
  const { state } = useContext(DataContext);
  const { _id, username, content, mediaURL, likes, comments, createdAt } =
    state.posts.find(({ _id }) => _id === postId);
  return (
    <div className="flex grow justify-center p-4 border-2 border-solid border-black">
      <div className="flex flex-col gap-8 w-full  md:w-2/5">
        <FeedCard
          _id={_id}
          username={username}
          content={content}
          mediaURL={mediaURL}
          likes={likes}
          comments={comments}
          createdAt={createdAt}
        />
        <div className="flex flex-col gap-2 p-4 h-96 break-word overflow-y-auto border-2 border-black border-solid">
          <div className="flex">
            <img
              src="/images/header-logo.svg"
              className="w-8 h-8 rounded-full object-cover"
            />
            <p>Tester</p>
            <div className=" flex grow relative justify-end">
              <FontAwesomeIcon icon={faEllipsisV} />
              <div className="hidden  absolute top-5 p-1 right-2 bg-primary text-white rounded-md">
                Delete
              </div>
            </div>
          </div>
          <div className="p-1">Hello World.....</div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <FontAwesomeIcon icon={faArrowDown} className="my-auto" />
              <FontAwesomeIcon icon={faArrowUp} className="my-auto" />
              <p>Reply</p>
            </div>
            <div className="hidden flex flex-col gap-1">
              <input
                className="grow p-1 border-2 border-solid border-grey rounded-md outline-none"
                placeholder="Enter your Reply"
              />
              <div className="flex justify-end gap-4">
                <button className="bg-black text-white p-2 rounded-md">
                  Cancel
                </button>
                <button className="bg-primary text-white p-2 rounded-md">
                  Post
                </button>
              </div>
            </div>
            <div className="flex grow gap-1 ml-2">
              <img
                src="/images/header-logo.svg"
                className="w-8 h-8 object-cover rounded-full"
              />
              <div>
                <p className="text-xl">Tester</p>
                <p>Hello</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex grow p-2 border-2 border-grey">
          <input
            placeholder="Enter your Comment"
            className="p-4 w-full outline-none"
          />
          <div className="my-auto">
            <button className="bg-primary text-white p-2 rounded-md">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M476.59 227.05l-.16-.07L49.35 49.84A23.56 23.56 0 0027.14 52 24.65 24.65 0 0016 72.59v113.29a24 24 0 0019.52 23.57l232.93 43.07a4 4 0 010 7.86L35.53 303.45A24 24 0 0016 327v113.31A23.57 23.57 0 0026.59 460a23.94 23.94 0 0013.22 4 24.55 24.55 0 009.52-1.93L476.4 285.94l.19-.09a32 32 0 000-58.8z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
