import {
  faClose,
  faPhotoFilm,
  faSmile,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import { useState } from "react";
import { addPost, editPost } from "../../services/postService";
import { AuthContext } from "../../context/AuthContext";

export function NewPost() {
  const { user, token } = useContext(AuthContext);
  const { state, dispatch } = useContext(DataContext);
  const [showEmoji, setShowEmoji] = useState(false);
  const postHandler = () =>
    state.postModal.action === "add"
      ? addPost(dispatch, state.postModal.tempPost, token)
      : editPost(
          dispatch,
          state.postModal.tempPost,
          state.postModal.tempPost._id,
          token
        );
  const emojis = [
    {
      emoji: "😀",
      code: "\u{1F600}",
      name: "Grinning Face",
    },
    {
      emoji: "🤔",
      code: "\u{1F914}",
      name: "Thinking Face",
    },
    {
      emoji: "😍",
      code: "\u{1F60D}",
      name: "Smiling Face with Heart-Eyes",
    },
    {
      emoji: "😂",
      code: "\u{1F602}",
      name: "Face with Tears of Joy",
    },
    {
      emoji: "🙏",
      code: "\u{1F64F}",
      name: "Folded Hands",
    },
    {
      emoji: "👍",
      code: "\u{1F44D}",
      name: "Thumbs Up",
    },
    {
      emoji: "🎉",
      code: "\u{1F389}",
      name: "Party Popper",
    },
    {
      emoji: "❤️",
      code: "\u{2764}",
      name: "Red Heart",
    },
    {
      emoji: "🌟",
      code: "\u{1F31F}",
      name: "Glowing Star",
    },
    {
      emoji: "💩",
      code: "\u{1F4A9}",
      name: "Pile of Poo",
    },
  ];

  return (
    <div
      className={`${
        state.postModal.view ? "absolute" : "hidden"
      }  left-0 right-0 top-0 flex h-screen bg-background-transparent z-50 justify-center items-center border-2 border-solid border-black`}
    >
      <div className="flex flex-col gap-2 bg-white w-full p-4 md:w-2/5 ">
        <div className="flex flex-col border-b border-black">
          <div className="flex gap-2">
            <img
              src={user?.avatarUrl}
              className="w-14 h-14 object-cover rounded full"
            />
            <textarea
              cols={40}
              rows={5}
              placeholder="What's in your mind"
              className="grow resize-none p-2 border-none focus:outline-none"
              defaultValue={state.postModal.tempPost.content}
              value={state.postModal.tempPost.content}
              onChange={(event) => {
                dispatch({
                  type: "POST_MODAL",
                  payload: {
                    ...state.postModal,
                    tempPost: {
                      ...state.postModal.tempPost,
                      content: event.target.value,
                    },
                  },
                });
              }}
            />
          </div>
          <div className="flex ">
            {state.postModal.tempPost.mediaURL.length > 0 && (
              <div className="relative">
                <img
                  className="w-20 h-20 object-cover relative"
                  src={state.postModal.tempPost.mediaURL}
                />
                <FontAwesomeIcon
                  icon={faClose}
                  className="absolute top-2 right-2"
                  color="red"
                  onClick={() => {
                    dispatch({
                      type: "POST_MODAL",
                      payload: {
                        ...state.postModal,
                        tempPost: {
                          ...state.postModal.tempPost,
                          mediaURL: "",
                        },
                      },
                    });
                  }}
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex ">
          <div className="flex gap-2 relative">
            <div className="flex gap-1 p-2 bg-primary text-white rounded-md">
              <FontAwesomeIcon icon={faPhotoFilm} className="m-auto" />
              <p>Photo/Gif</p>
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

                  dispatch({
                    type: "POST_MODAL",
                    payload: {
                      ...state.postModal,
                      tempPost: {
                        ...state.postModal.tempPost,
                        mediaURL: base64File,
                      },
                    },
                  });
                }}
                className="absolute opacity-0 w-28"
              />
            </div>
            <div className="flex relative gap-1 p-2 bg-primary text-white rounded-md">
              <FontAwesomeIcon icon={faSmile} className="m-auto" />
              <p onClick={() => setShowEmoji(!showEmoji)}>Emoji</p>

              {showEmoji && (
                <div className=" absolute flex justify-center items-center p-2 w-40  flex-wrap bg-background-transparent md:top-3">
                  {emojis.map((emoji) => (
                    <span
                      onClick={() => {
                        console.log(
                          state.postModal.tempPost.content +
                            emojis.find((emo) => emo.code === emoji.code).code
                        );
                        dispatch({
                          type: "POST_MODAL",
                          payload: {
                            ...state.postModal,
                            tempPost: {
                              ...state.postModal.tempPost,
                              content:
                                state.postModal.tempPost.content +
                                emojis.find((emo) => emo.code === emoji.code)
                                  .code,
                            },
                          },
                        });
                        setShowEmoji(!showEmoji);
                      }}
                      className="text-2xl"
                    >
                      {emoji.emoji}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="grow flex  gap-2 justify-end">
            <button
              onClick={() => {
                postHandler();
                dispatch({
                  type: "POST_MODAL",
                  payload: {
                    view: false,
                    tempPost: { content: "", mediaURL: "", action: "" },
                  },
                });
              }}
              className="bg-primary text-white p-2 rounded-md"
            >
              Post
            </button>
            <button
              onClick={() => {
                //postHandler();
                dispatch({
                  type: "POST_MODAL",
                  payload: {
                    view: false,
                    tempPost: { content: "", mediaURL: "", action: "" },
                  },
                });
              }}
              className="bg-primary text-white p-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
