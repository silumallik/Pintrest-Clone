import User from "@/models/User";
import Pin from "@/models/Pin";
import mongoose from "mongoose";

export async function getUserById(id, currentUserId) {

  const user = await User.findById(id)
    .populate("followers", "name image")
    .populate("following", "name image")
    .populate("pins")
    .populate("savedPins")
  
  if (!user) return null;
  
  // followers me follow status add
  const followers = user.followers.map((u) => ({
    _id: u._id,
    name: u.name,
    image: u.image,
    isFollowing: user.following.some(
      (f) => f._id.toString() === u._id.toString()
    )
  }));

  // following list
  const following = user.following.map((u) => ({
    _id: u._id,
    name: u.name,
    image: u.image,
    isFollowing: true
  }));

  const isFollowing =
    user.followers.some(
      (f) => f._id.toString() === currentUserId?.toString()
    );

  return {
    ...user.toObject(),
    followers,
    following,
    isFollowing
  };
}


/* ================= FOLLOW USER ================= */

export async function toggleFollow(currentUserId, targetUserId) {

  if (currentUserId === targetUserId) {
    throw new Error("You cannot follow yourself");
  }

  const currentUser = await User.findById(currentUserId);
  const targetUser = await User.findById(targetUserId);

  if (!currentUser || !targetUser) {
    throw new Error("User not found");
  }

  const isFollowing =
    currentUser.following.includes(targetUserId);

  if (isFollowing) {

    // UNFOLLOW
    currentUser.following.pull(targetUserId);
    targetUser.followers.pull(currentUserId);

  } else {

    // FOLLOW
    currentUser.following.push(targetUserId);
    targetUser.followers.push(currentUserId);

  }

  await currentUser.save();
  await targetUser.save();

  return {
    isFollowing: !isFollowing,
  };
}

/* ================= SAVE PIN ================= */

export const toggleSavePin = async (userId, pinId) => {
  const user = await User.findById(userId);

  if (!user) throw new Error("User not found");

  const alreadySaved = user.savedPins.includes(pinId);

  if (alreadySaved) {
    user.savedPins.pull(pinId);
  } else {
    user.savedPins.push(pinId);
  }

  await user.save();

  return user;
};
