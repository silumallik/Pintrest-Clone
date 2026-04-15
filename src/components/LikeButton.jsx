"use client";

import { useState } from "react";
import { useSession, signIn } from "next-auth/react";

export default function LikeButton({
  pinId,
  initialLikes,
  initialLiked = false,
}) {

  const { data: session } = useSession();
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(initialLiked);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {

    // user login nahi hai
    if (!session) {
      signIn(); // login form open
      return;
    }

    if (loading) return;

    setLoading(true);

    const res = await fetch("/api/pins/like", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ pinId }),

    });

    const data = await res.json();

    setLikes(data.likes);
    setLiked(data.liked);

    setLoading(false);

  };

  return (

    <button
      onClick={handleLike}
      className="bg-red-700 px-4 py-2 rounded-xl hover:bg-red-600"
      style={{ padding: "6px 13px", margin: "8px 0px", cursor:"pointer" }}
    >

      {liked ? "❤️" : "🤍"} {likes}

    </button>

  );

}