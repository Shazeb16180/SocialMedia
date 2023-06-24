import { json } from "react-router";

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

export async function addPost(dispatch, postData, token) {
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
      // dispatch({})
    } else throw new Error("Error Creating Posts");
  } catch (error) {
    console.error(error);
  }
}
export async function editPost(dispatch, post, _id, token) {
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
    console.log(response);
    if (response.status === 201) {
      const { posts } = await response.json();
      dispatch({ type: "POSTS", payload: posts });
    } else throw new Error("Error Creating Posts");
  } catch (error) {
    console.error(error);
  }
}
export async function deletePost(dispatch, _id, token) {
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
    } else throw new Error("Error Creating Posts");
  } catch (error) {
    console.error(error);
  }
}
