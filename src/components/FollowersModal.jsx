"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signIn } from "next-auth/react";

export default function FollowersModal({ title, users = [], onClose, currentUserId }) {

  const { data: session } = useSession();
  const [userList, setUserList] = useState(users);

  const handleFollow = async (id, index) => {
    try {

      // user login nahi hai
      if (!session) {
        signIn(); // login form open
        return;
      }

      const res = await fetch(`/api/users/follow/${id}`, {
        method: "POST",
      });

      const data = await res.json();

      // state update
      setUserList((prev) => {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          isFollowing: data.isFollowing,
        };
        return updated;
      });

    } catch (error) {
      console.error("Follow error:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" >

      <div className="bg-[#1a1a1a] w-[400px] max-h-[500px] rounded-xl p-4 overflow-y-auto" style={{ paddingBottom: "1%" }}>

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4" style={{ padding: "1% 2%" }}>
          <h2 className="text-white text-lg font-bold">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-white text-xl"
          >
            ✕
          </button>
        </div>

        {userList.length === 0 && (
          <p className="text-gray-400">No Users</p>
        )}

        {userList.map((user, index) => (

          <div
            key={`${user._id}-${index}`}
            style={{ padding: "1% 2%" }}
            className="flex items-center justify-between p-2 hover:bg-gray-800 rounded mb-2"
          >

            {/* USER INFO */}
            <Link
              href={`/profile/${user._id}`}
              onClick={onClose}
              className="flex items-center gap-3"
            >
              <img
                src={user.image || "/default-avatar.png"}
                className="w-10 h-10 rounded-full"
              />

              <span className="text-white">
                {user.name}
              </span>
            </Link>

            {/* FOLLOW BUTTON */}
            {user._id !== currentUserId && (
              <button
                onClick={() => handleFollow(user._id, index)}
                style={{ padding: ".5% 2%" }}
                className={`px-3 py-1 rounded text-sm cursor-pointer ${user.isFollowing
                  ? "bg-gray-600 text-white"
                  : "bg-red-500 text-white"
                  }`}
              >
                {user.isFollowing ? "Remove" : "Follow"}
              </button>
            )}

          </div>
        ))}

      </div>
    </div>
  );
}