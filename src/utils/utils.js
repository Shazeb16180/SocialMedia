export function getMyPosts(user, sort, posts) {
  if (!window.location.href.includes("/explore")) {
    let homePosts = user.following.map(({ username }) => username);
    homePosts = posts.filter(
      (post) =>
        homePosts.includes(post.username) || post.username === user.username
    );
    return getSortedPosts(sort, homePosts);
  } else return posts;
}
export function getSortedPosts(sort, posts) {
  return sort === "Trending"
    ? [...posts].sort(({ likes: a }, { likes: b }) => b.likeCount - a.likeCount)
    : sort === "Latest"
    ? [...posts].sort(
        ({ createdAt: a }, { createdAt: b }) => Date.parse(b) - Date.parse(a)
      )
    : posts;
}

export function getUnFollowedUsers(user, allUser) {
  const followingUserName = user.following.map(({ username }) => username);
  return allUser.filter(
    (dbUser) =>
      !followingUserName.includes(dbUser.username) &&
      dbUser.username !== user.username
  );
}
