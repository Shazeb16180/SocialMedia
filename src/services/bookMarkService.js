export async function addBookMark(setUser, user, _id, token) {
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
    } else throw new Error("Error BookMarking");
  } catch (error) {
    console.error(error);
  }
}
export async function removeBookMark(setUser, user, _id, token) {
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
    } else throw new Error("Error BookMarking");
  } catch (error) {
    console.error(error);
  }
}
