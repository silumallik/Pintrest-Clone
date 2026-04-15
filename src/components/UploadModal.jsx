"use client";

import { useState } from "react";

export default function UploadModal({ isOpen, onClose }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    const uploadRes = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const { url } = await uploadRes.json();

    await fetch("/api/pins", {
      method: "POST",
      body: JSON.stringify({ title, image: url }),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-96">
        <h2 className="text-xl font-bold mb-4">Create Pin</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <input
            placeholder="Title"
            className="input"
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className="btn w-full">Upload</button>
        </form>

        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
