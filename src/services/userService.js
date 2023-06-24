export async function getAllUsers(dispatch) {
  try {
    const response = await fetch("/api/users");
    if (response.status === 200) {
      const { users } = await response.json();
      dispatch({ type: "USERS", payload: users });
    } else throw new Error("Error in Getting Users");
  } catch (error) {
    console.error(error);
  }
}

export async function editUser(setUser, userData, token) {
  try {
    const response = await fetch("/api/users/edit", {
      method: "POST",
      headers: {
        authorization: token,
      },
      body: JSON.stringify({ userData }),
    });
    console.log(response);
    if (response.status === 201) {
      const { user } = await response.json();
      setUser(user);
    } else throw new Error("Error in Getting User");
  } catch (error) {
    console.error(error);
  }
}

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
