"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeletePinButton({ pinId }) {

  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
    <button
      onClick={handleDelete}
      style={{padding: "6px 13px", margin: "8px 0px", cursor:"pointer"}}
      className="bg-red-700 text-white px-4 py-2 rounded-xl"
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}