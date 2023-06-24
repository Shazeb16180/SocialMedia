export const initalState = {
  posts: [],
  users: [],
  postModal: {
    view: false,
    tempPost: { content: "", mediaURL: "" },
    action: "add",
  },
};

export function dataReducer(state, action) {
  switch (action.type) {
    case "POSTS":
      return { ...state, posts: action.payload };
    case "POST_MODAL":
      return { ...state, postModal: action.payload };
    case "USERS":
      return { ...state, users: action.payload };
    case "LOGOUT":
      return { ...initalState };
    default:
      return { ...initalState };
  }
}
