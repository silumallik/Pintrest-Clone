"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePin() {

  const router = useRouter();

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!file) {
      alert("Please select image");
      return;
    }

    if (!title || !category) {
      alert("Title and category required");
      return;
    }

    try {

      setLoading(true);

      // STEP 1: upload image
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();
      console.log("UPLOAD DATA:", uploadData);

      if (!uploadRes.ok) {
        throw new Error(uploadData.message || "Upload failed");
      }

      // STEP 2: create pin
      const pinRes = await fetch("/api/pins", {
        // console.log(pinRes);
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({

          title,
          description,
          category,
          image: uploadData.imageUrl,

        }),

      });

      const pinData = await pinRes.json();
      console.log(pinData)

      if (!pinRes.ok) {
        throw new Error(pinData.message || "Pin create failed");
      }

      console.log("Pin created:", pinData);

      router.push("/");

    } catch (error) {

      console.error(error);
      alert(error.message);

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-gray-900 via-black to-gray-800
      px-8">   {/* 👈 Parent container me left-right padding add */}

      <form
        onSubmit={handleSubmit}
        className="w-80 max-w-md h-90
        backdrop-blur-xl bg-white/10 
        border border-white/20 
        shadow-2xl 
        rounded-3xl 
        p-1              {/* 👈 Form ke andar padding add */}
        flex flex-col 
        gap-0 justify-around items-center"
      >

        <h2 className="text-2xl font-semibold text-center text-white">
          Create Post
        </h2>

        <input
          type="text"
          placeholder="Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{padding:"0 10px"}}
          className="w-74 py-4 px-6 h-11  {/* 👈 Input ke andar left-right padding add */}
          rounded-xl 
          bg-white/20 
          border border-white/30 
          text-white 
          placeholder-white/60
          focus:outline-none 
          focus:ring-2 
          focus:ring-red-400"
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{padding:"0 10px"}}
          className="w-74 py-4 px-6 h-11
          rounded-xl 
          bg-white/20 
          border border-white/30 
          text-white 
          placeholder-white/60
          focus:outline-none 
          focus:ring-2 
          focus:ring-red-400"
        />

        <input
          type="text"
          placeholder="Category"
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{padding:"0 10px"}}
          className="w-74 py-4 px-6 h-11
          rounded-xl 
          bg-white/20 
          border border-white/30 
          text-white 
          placeholder-white/60
          focus:outline-none 
          focus:ring-2 
          focus:ring-red-400"
        />

        <input
          type="file"
          required
          onChange={(e) => setFile(e.target.files[0])}
          className="
          w-74
          px-4 py-3
          text-white
          bg-pink-500
          rounded-lg
          cursor-pointer
          file:mr-4
          file:py-2
          file:px-4
          file:rounded-md
          file:border-0
          file:text-sm
          file:font-medium
          file:bg-white
          file:text-pink-600
          hover:file:bg-gray-100
          transition"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-74 py-4 rounded-xl h-13 
          bg-red-500 text-white font-semibold 
          hover:bg-red-600 cursor-pointer">
          {loading ? "Creating..." : "Create Pin"}
        </button>

      </form>
    </div>
  );

}
