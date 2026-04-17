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

  const isFollowing = currentUser.following.some(
    (id) => id.toString() === targetUserId.toString()
  );

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

  await currentUser.save();
  await targetUser.save();

  return {
    isFollowing: !isFollowing
  };
}
