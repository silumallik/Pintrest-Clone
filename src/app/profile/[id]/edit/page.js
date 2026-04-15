// "use client";

// import { useState, useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";

// export default function EditProfilePage() {

//   const router = useRouter();
//   const params = useParams();

//   const [name, setName] = useState("");
//   const [username, setUsername] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {

//     async function fetchUser() {

//       const res = await fetch(`/api/users/${params.id}`);
//       const user = await res.json();

//       setName(user.name || "");
//       setUsername(user.username || "");

//     }

//     fetchUser();

//   }, [params.id]);

//   const handleUpdate = async () => {

//     setLoading(true);

//     const res = await fetch(`/api/users/${params.id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         name,
//         username,
//       }),
//     });

//     if (res.ok) {
//       router.push(`/profile/${params.id}`);
//     }

//     setLoading(false);

//   };

//   return (

//     <div className="max-w-md mx-auto py-10">

//       <h1 className="text-2xl font-bold mb-4">
//         Edit Profile
//       </h1>

//       <input
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         placeholder="Name"
//         className="w-full p-2 mb-3 bg-gray-800 rounded"
//       />

//       <input
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         placeholder="Username"
//         className="w-full p-2 mb-3 bg-gray-800 rounded"
//       />

//       <button
//         onClick={handleUpdate}
//         disabled={loading}
//         className="w-full bg-blue-600 p-2 rounded"
//       >
//         {loading ? "Updating..." : "Update"}
//       </button>

//     </div>

//   );

// }





"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProfile() {

  const router = useRouter();
  const params = useParams()

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {

    setLoading(true);

    const formData = new FormData();

    formData.append("name", name);
    formData.append("username", username);
    formData.append("bio", bio);

    if (image) {
      formData.append("image", image);
    }

    const res = await fetch("/api/users/profile", {

      method: "PUT",

      body: formData,

    });

    if (res.ok) {

      router.push(`/profile/${params.id}`);

      router.refresh();

    }

    setLoading(false);

  };


  const handleRemoveImage = async () => {

    const res = await fetch(
      "/api/users/profile/remove-image",
      {
        method: "DELETE",
      }
    );

    if (res.ok) {

      alert("Image removed");

      router.refresh();

    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4" style={{padding:"15% 4%"}}>

      <div className="
      w-full
      sm:w-[90%] 
      md:w-[60%] 
      lg:w-[40%] 
      xl:w-[33%]
      min-h-[75vh]
      backdrop-blur-xl 
      bg-white/10 
      border border-white/20 
      shadow-2xl 
      rounded-2xl 
      py-12
      flex flex-col
      justify-center
      text-white
    " style={{padding:"15px 0px",}}>

        <h1 className="text-3xl font-bold text-center mb-10" style={{paddingBottom:"20px"}}>
            Edit Profile
        </h1>

        <div className="flex flex-col items-center gap-6">

          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{padding:"0 10px"}}
            className="w-[85%] px-5 py-4 h-10
                     rounded-xl 
                     bg-white/15 
                     border border-white/20
                     placeholder-gray-300
                     focus:outline-none
                     focus:ring-2 focus:ring-pink-500
                     transition-all duration-300"
          />

          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{padding:"0 10px"}}
            className="w-[85%] px-5 py-4 h-10
                     rounded-2xl 
                     bg-white/15 
                     border border-white/20
                     placeholder-gray-300
                     focus:outline-none
                     focus:ring-2 focus:ring-pink-500
                     transition-all duration-300"
          />

          <textarea
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            style={{padding:"4px 10px"}}
            className="w-[85%] px-5 py-4 min-h-[70px]
                     rounded-2xl 
                     bg-white/15 
                     border border-white/20
                     resize-none
                     placeholder-gray-300
                     focus:outline-none
                     focus:ring-2 focus:ring-pink-500
                     transition-all duration-300"
          />

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-[85%] text-sm text-gray-200 
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-xl file:border-0
                     file:bg-pink-600 file:text-white
                     hover:file:bg-pink-700 transition cursor-pointer"
          />

          <button
            onClick={handleRemoveImage}
            style={{height:"38px"}}
            className="w-[75%] bg-red-500/80 
                     hover:bg-red-600 
                     transition p-4 rounded-xl font-semibold cursor-pointer"
          >
            Remove Profile Image
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{height:"38px"}}
            className="w-[75%] bg-pink-600 
                     hover:bg-pink-700 
                     transition p-4 rounded-xl font-semibold 
                     disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>

        </div>
      </div>
    </div>
  );

}