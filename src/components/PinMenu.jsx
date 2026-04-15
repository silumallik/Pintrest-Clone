"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PinMenu({ pinId, isOwner }) {

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!isOwner) return null; // owner nahi hai to menu hi nahi dikhega

  const handleDelete = async () => {

    if (!confirm("Delete this pin?")) return;

    setLoading(true);

    await fetch(`/api/pins/${pinId}`, {
      method: "DELETE",
    });

    router.push("/");
    router.refresh();
  };

  return (
    <div className="relative md:hidden">

      {/* three dots */}
      <button
        onClick={() => setOpen(!open)}
        style={{padding:"8px 0px",border:"0px solid red",cursor:"pointer"}}
        className="text-2xl px-2"
      >
        ⋮
      </button>

      {/* popup */}
      {open && (
        <div className="fixed right-0 mt-2 w-32 rounded-xl" style={{margin:"1% 4%"}}>

          <button
            onClick={handleDelete}
            style={{padding:"6% 0",marginRight:"10px",marginTop:"-4px"}}
            className="block w-full text-center px-4 py-2 bg-red-700 text-white-500 hover:bg-red-600 rounded-xl"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>

        </div>
      )}

    </div>
  );
}