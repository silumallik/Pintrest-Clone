import User from "@/models/User";

export async function toggleFollow(currentUserId, targetUserId) {

  if (currentUserId === targetUserId) {
    throw new Error("You cannot follow yourself");
  }

  const currentUser = await User.findById(currentUserId);
  const targetUser = await User.findById(targetUserId);

  if (!currentUser || !targetUser) {
    throw new Error("User not found");
  }

  // const isFollowing = currentUser.following.includes(targetUserId);

  const isFollowing = currentUser.following.some(
    (id) => id.toString() === targetUserId.toString()
  );

  console.log("Before:", currentUser.following);

  if (isFollowing) {

    // ✅ UNFOLLOW
    currentUser.following.pull(targetUserId);
    targetUser.followers.pull(currentUserId);

  } else {

    // ✅ FOLLOW
    if (!currentUser.following.includes(targetUserId)) {
      currentUser.following.push(targetUserId);
    }

    if (!targetUser.followers.includes(currentUserId)) {
      targetUser.followers.push(currentUserId);
    }

  }

  // if (isFollowing) {

  //   // ✅ UNFOLLOW
  //   currentUser.following.pull(targetUserId);
  //   targetUser.followers.pull(currentUserId);

  // } else {

  //   // ✅ FOLLOW (duplicate check)
  //   if (!currentUser.following.includes(targetUserId)) {
  //     currentUser.followers.push(targetUserId);
  //   }

  //   if (!targetUser.following.includes(currentUserId)) {
  //     targetUser.followers.push(currentUserId);
  //   }

  // }

  await currentUser.save();
  await targetUser.save();

  console.log("After:", currentUser.following);

  return {
    isFollowing: !isFollowing
  };
}