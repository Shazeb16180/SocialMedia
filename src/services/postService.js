const uploadImage = async (image) => {
  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", "testing");
  data.append("cloud_name", "shazeb");
  try {
    const response = await fetch(
      "  https://api.cloudinary.com/v1_1/shazeb/image/upload",
      {
        method: "post",
        body: data,
      }
    );
    if (response.status === 200) {
      const { url } = await response.json();

      return url;
    } else throw new Error("Error Cloudinary");
  } catch (error) {
    console.error(error);
    return "";
  }
};

export async function addPost(dispatch, postData, token, toast) {
  if (postData.mediaURL.length > 0) {
    postData.mediaURL = await uploadImage(postData.mediaURL);
  }
  console.log(postData);
  try {
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        authorization: token,
      },
      body: JSON.stringify({ postData }),
    });
    if (response.status === 201) {
      const { posts } = await response.json();
      dispatch({ type: "POSTS", payload: posts });
      toast.success("Post Added");
    } else throw new Error("Error Creating Posts");
  } catch (error) {
    toast.error(error);
    console.error(error);
  }
}
export async function editPost(dispatch, post, _id, token, toast) {
  if (post.mediaURL.length > 0 && !post.mediaURL.includes("cloudinary")) {
    post.mediaURL = await uploadImage(post.mediaURL);
  }
  try {
    const response = await fetch(`/api/posts/edit/${_id}`, {
      method: "POST",
      headers: {
        authorization: token,
      },
      body: JSON.stringify({ postData: post }),
    });
    if (response.status === 201) {
      const { posts } = await response.json();
      dispatch({ type: "POSTS", payload: posts });
      toast.success("Post Updated");
    } else throw new Error("Error Updating Posts");
  } catch (error) {
    toast.error(error);
    console.error(error);
  }
}
export async function deletePost(dispatch, _id, token, toast) {
  try {
    const response = await fetch(`/api/posts/${_id}`, {
      method: "DELETE",
      headers: {
        authorization: token,
      },
    });
    if (response.status === 201) {
      const { posts } = await response.json();
      dispatch({ type: "POSTS", payload: posts });
      toast.success("Post Deleted");
    } else throw new Error("Error Deleting Posts");
  } catch (error) {
    toast.error(error);
    console.error(error);
  }
}

export async function addBookMark(setUser, user, _id, token, toast) {
  try {
    const response = await fetch(`/api/users/bookmark/${_id}`, {
      method: "POST",
      headers: {
        authorization: token,
      },
    });
    console.log(response);
    if (response.status === 200) {
      const { bookmarks } = await response.json();
      //dispatch({ type: "BOOKMARKS", payload: bookmarks });

      setUser({ ...user, bookmarks: bookmarks });
      toast.success("Post Bookmarked");
    } else throw new Error("Error BookMarking");
  } catch (error) {
    toast.error(error);
    console.error(error);
  }
}
export async function removeBookMark(setUser, user, _id, token, toast) {
  try {
    const response = await fetch(`/api/users/remove-bookmark/${_id}`, {
      method: "POST",
      headers: {
        authorization: token,
      },
    });
    if (response.status === 200) {
      const { bookmarks } = await response.json();
      //dispatch({ type: "BOOKMARKS", payload: bookmarks });
      setUser({ ...user, bookmarks: bookmarks });
      toast.success("Post Removed From BookMark");
    } else throw new Error("Error BookMarking");
  } catch (error) {
    toast.error(error);
    console.error(error);
  }
}
export async function likePost(dispatch, _id, token) {
  try {
    const response = await fetch(`/api/posts/like/${_id}`, {
      method: "POST",
      headers: {
        authorization: token,
      },
    });
    if (response.status === 201) {
      const { posts } = await response.json();
      dispatch({ type: "POSTS", payload: posts });
    } else throw new Error("Error in Like");
  } catch (error) {
    console.error(error);
  }
}
export async function disLikePost(dispatch, _id, token) {
  try {
    const response = await fetch(`/api/posts/dislike/${_id}`, {
      method: "POST",
      headers: {
        authorization: token,
      },
    });
    if (response.status === 201) {
      const { posts } = await response.json();
      dispatch({ type: "POSTS", payload: posts });
    } else throw new Error("Error in Like");
  } catch (error) {
    console.error(error);
  }
}
