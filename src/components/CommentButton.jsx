"use client";

import { useState } from "react";
import CommentSection from "./CommentSection";

export default function CommentButton({ pinId, comments, pinOwner }) {

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* COMMENT BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="bg-red-700 rounded-xl text-sm hover:bg-gray-600 hover:bg-red-600"
        style={{ padding: "6px 13px", margin: "8px 0px", alignContent: "center", cursor:"pointer" }}
      >
        Comments
      </button>

      {/* POPUP */}
      {open && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

          <div className="bg-[#1a1a1a] w-full max-w-lg rounded-xl p-6 relative">

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-white text-lg"
            >
              ✕
            </button>

            <CommentSection
              pinId={pinId}
              comments={comments}
              pinOwner={pinOwner}
            />

          </div>

        </div>
      )}
    </>
  );
}