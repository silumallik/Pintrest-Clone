"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";

export default function CommentSection({ pinId, comments, pinOwner }) {

  const { data: session } = useSession();
  const [text, setText] = useState("");

  const [allComments, setAllComments] = useState(
    Array.isArray(comments) ? comments : []
  );

  const handleComment = async () => {

    // user login nahi hai
    if (!session) {
      signIn(); // login form open
      return;
    }

    const res = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pinId,
        text,
      }),
    });

    const newComment = await res.json();

    if (!newComment._id) return;

    setAllComments((prev) => [
      newComment,
      ...prev.filter(c => c._id !== newComment._id)
    ]);

    setText("");
  };

  return (
    <div style={{ marginBottom: "2%" }}>

      <h3 className="text-lg font-semibold mb-3" style={{ padding: "2%" }}>
        Comments ({allComments.length})
      </h3>

      {/* PROFILE + INPUT SAME LINE */}
      <div className="flex items-center gap-3 mb-4"
        style={{ padding: "2% 2%" }}>

        {/* PIN OWNER PROFILE */}
        {pinOwner && (
          <Link href={`/profile/${pinOwner._id}`}>
            <img
              src={pinOwner.image || "/default-avatar.png"}
              alt={pinOwner.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          </Link>
        )}

        {/* INPUT */}
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{padding:"0 2%"}}
          className="flex-1 bg-gray-800 p-2 rounded h-7"
          placeholder="Add comment"
        />

        {/* POST BUTTON */}
        <button
          onClick={handleComment}
          className="bg-blue-600 px-4 py-2 rounded h-7"
          style={{ padding: ".5% 2%" }}
        >
          Post
        </button>

      </div>

      {/* COMMENTS LIST */}
      {
        allComments.map((comment) => (

          <div key={comment._id} className="flex items-start gap-3 mb-3"
            style={{ paddingLeft: "2%", paddingTop: "2%" }}
          >

            <Link href={`/profile/${comment.user?._id}`}>
              <img
                src={comment.user?.image || "/default-avatar.png"}
                alt={comment.user?.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            </Link>

            <div>

              <p className="font-semibold text-sm">
                {comment.user?.name || "User"}
              </p>

              <p className="text-gray-400 text-sm">
                {comment.text}
              </p>

            </div>

          </div>

        ))
      }

    </div >
  );
}
