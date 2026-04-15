"use client";

import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FollowButton({
  targetUserId,
  initialIsFollowing,
}) {

  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  // ✅ prop change hone par state update
  // useEffect(() => {
  //   setIsFollowing(initialIsFollowing);
  // }, [initialIsFollowing]);

  const handleFollow = async () => {

    if (loading) return;

    try {

      setLoading(true);

      const res = await fetch(`/api/users/follow/${targetUserId}`, {
        method: "POST",
      });

      const data = await res.json();

      console.log("Is Following own", data.isFollowing);

      // ✅ server se jo state aaye wahi set karo
      setIsFollowing(data.isFollowing);
      router.refresh()
      // setIsFollowing(true);
      // router.refresh();

    } catch (error) {

      console.log(error);

    } finally {
      setLoading(false);
    }

  };

  return (
    <button
      onClick={handleFollow}
      style={{ padding: ".3% 3%" }}
      className={`px-6 py-2 rounded-full mt-4 font-semibold transition cursor-pointer ${isFollowing
          ? "bg-gray-600 hover:bg-gray-700"
          : "bg-red-600 hover:bg-red-700"
        }`}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
}