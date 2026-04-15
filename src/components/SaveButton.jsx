"use client";

import { useState } from "react";
import { useSession, signIn } from "next-auth/react";

export default function SaveButton({ pinId, initialSaved }) {

  const { data: session } = useSession();
  const [saved, setSaved] = useState(initialSaved);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setSaved(initialSaved);
  // }, [initialSaved]);

  const handleSave = async () => {
    try {
      // user login nahi hai
      if (!session) {
        signIn(); // login form open
        return;
      }

      setLoading(true);

      const res = await fetch("/api/pins/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pinId }),
      });

      const data = await res.json();

      setSaved(data.saved);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSave}
      disabled={loading}
      style={{ padding: "6px 13px", margin: "8px 0px", alignContent: "center", cursor:"pointer" }}
      className={`px-4 py-2 rounded-xl font-semibold transition ${saved
        ? "bg-gray-700 text-white"
        : "bg-red-700 text-white hover:bg-red-600"
        }`}
    >
      {saved ? "saved" : "save"}
    </button>
  );
}