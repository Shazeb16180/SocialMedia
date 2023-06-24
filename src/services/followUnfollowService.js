export async function followService(setUser, _id, token) {
  try {
    const response = await fetch(`/api/users/follow/${_id}`, {
      method: "POST",
      headers: {
        authorization: token,
      },
    });
    if (response.status === 200) {
      const { user } = await response.json();
      setUser(user);
    } else throw new Error("Error in Follow");
  } catch (error) {
    console.error(error);
  }
}
export async function unFollowService(setUser, _id, token) {
  try {
    const response = await fetch(`/api/users/unfollow/${_id}`, {
      method: "POST",
      headers: {
        authorization: token,
      },
    });
    if (response.status === 200) {
      const { user } = await response.json();
      setUser(user);
    } else throw new Error("Error in Follow");
  } catch (error) {
    console.error(error);
  }
}
