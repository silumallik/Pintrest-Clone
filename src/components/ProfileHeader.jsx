"use client";

export default function ProfileHeader({ user }) {
  return (
    <div className="text-center mb-8">
      <img
        src={user.image || "/avatar.png"}
        className="w-24 h-24 rounded-full mx-auto mb-4"
      />
      <h1 className="text-2xl font-bold">{user.name}</h1>
      <p className="text-gray-500">
        {user.followers.length} Followers · {user.following.length} Following
      </p>
    </div>
  );
}
