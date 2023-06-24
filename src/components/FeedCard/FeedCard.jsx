import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  faBookmark,
  faEllipsisV,
  faHeart,
  faMessage,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as farHeart,
  faBookmark as farBookmark,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { disLikePost, likePost } from "../../services/postService";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import { AuthContext } from "../../context/AuthContext";
import { addBookMark, removeBookMark } from "../../services/postService";
import { deletePost } from "../../services/postService";

export function FeedCard({
  _id,
  username,
  content,
  mediaURL,
  likes,
  comments,
  createdAt,
}) {
  const { user, setUser, token } = useContext(AuthContext);
  const { state, dispatch } = useContext(DataContext);
  const navigate = useNavigate();
  const [options, setOptions] = useState(false);
  const didILiked = likes.likedBy.find(({ _id: dbId }) => user._id === dbId);
  const didIBookMarked = user.bookmarks.find((dbId) => _id === dbId);
  const likeHandler = () =>
    didILiked
      ? disLikePost(dispatch, _id, token, toast)
      : likePost(dispatch, _id, token, toast);
  const bookMarkHandler = () =>
    didIBookMarked
      ? removeBookMark(setUser, user, _id, token, toast)
      : addBookMark(setUser, user, _id, token, toast);
  return (
    <div className="flex flex-col justify-between gap-4 shadow-md rounded-md p-4">
      <div className="flex">
        <div className="flex gap-2">
          <img
            className="w-14 h-20 object-cover rounded-md"
            src={
              state.users.find(
                ({ username: dbUserName }) => username === dbUserName
              )?.avatarUrl
            }
          />
          <div>
            <h1 className="text-xl">{username}</h1>
            <p className="text-lightgrey">
              {createdAt.substring(0, createdAt.indexOf("T"))}
            </p>
          </div>
        </div>
        {username === user.username && (
          <div className="flex grow justify-end relative">
            <FontAwesomeIcon
              icon={faEllipsisV}
              size="lg"
              className="cursor-pointer"
              onClick={() => setOptions(!options)}
            />
            {options && (
              <div className="absolute top-2 right-2 p-2 bg-primary text-white rounded-md ">
                <p
                  className="p-1 hover:bg-white hover:text-black rounded-md cursor-pointer"
                  onClick={() => {
                    window.scroll({ top: 0 });
                    setOptions(!options);
                    dispatch({
                      type: "POST_MODAL",
                      payload: {
                        view: true,
                        tempPost: {
                          _id,
                          username,
                          content,
                          mediaURL,
                          likes,
                          comments,
                          createdAt,
                        },
                        action: "edit",
                      },
                    });
                  }}
                >
                  Update
                </p>
                <p
                  className="p-1 hover:bg-white hover:text-black rounded-md cursor-pointer"
                  onClick={() => {
                    setOptions(!options);
                    deletePost(dispatch, _id, token, toast);
                  }}
                >
                  Delete
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      <div className=" flex flex-col gap-2">
        <p className="break-words">{content}</p>
        {mediaURL.length > 0 ? (
          mediaURL.endsWith(".mp4") ? (
            <video controls src={mediaURL} />
          ) : (
            <img className="object-cover" src={mediaURL} />
          )
        ) : (
          ""
        )}
      </div>
      <div className="flex justify-between">
        <div className="flex">
          <FontAwesomeIcon
            onClick={() => likeHandler()}
            icon={didILiked ? faHeart : farHeart}
            size="4x"
            className="w-1/4 cursor-pointer"
            color="#755bb4"
          />
          <p className="my-auto">{likes.likeCount}</p>
        </div>
        <div>
          <FontAwesomeIcon
            icon={faMessage}
            size="4x"
            className="w-1/4 cursor-pointer"
            color="#755bb4"
            onClick={() => navigate(`/post/${_id}`)}
          />
        </div>
        <div>
          <FontAwesomeIcon
            icon={didIBookMarked ? faBookmark : farBookmark}
            onClick={() => bookMarkHandler()}
            size="4x"
            color="#755bb4"
            className="w-1/4 cursor-pointer"
          />
        </div>
        <div>
          <FontAwesomeIcon
            icon={faShare}
            size="4x"
            className="w-1/4 cursor-pointer"
            color="#755bb4"
            onClick={() => {
              navigator.clipboard.writeText(
                `https://bakingram.netlify.app/post/${post._id}`
              );
            }}
          />
        </div>
      </div>
    </div>
  );
}
