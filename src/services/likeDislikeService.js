export async function likePost(dispatch, _id, token) {
  try {
    const response = await fetch(`/api/posts/like/${_id}`, {
      method: "POST",
      headers: {
        authorization: token,
      },
    });
    console.log(response);
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
