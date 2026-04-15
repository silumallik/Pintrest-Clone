"use client";

import { useState } from "react";
import Link from "next/link";

export default function ProfileTabs({ pins = [], savedPins = [] }) {

  const [activeTab, setActiveTab] = useState("created");

  const data = activeTab === "created" ? pins : savedPins;

  return (

    <div className="w-full overflow-x-hidden" style={{ width: "100%", overflowX: "hidden" }}>

      {/* TABS */}
      <div className="flex gap-6 border-b border-gray-700 mb-6"
        style={{ width: "100%", justifyContent: "space-evenly" }}>

        <button
          onClick={() => setActiveTab("created")}
          className={`pb-2 font-semibold ${activeTab === "created"
              ? "border-b-2 border-red-500 text-white"
              : "text-gray-400"
            }`}
        >
          Created
        </button>

        <button
          onClick={() => setActiveTab("saved")}
          className={`pb-2 font-semibold ${activeTab === "saved"
              ? "border-b-2 border-red-500 text-white"
              : "text-gray-400"
            }`}
        >
          Saved
        </button>

      </div>

      {/* GRID */}
      <div className="w-full px-4">

        {data.length === 0 && (
          <p className="text-gray-400 flex justify-center">No pins found</p>
        )}

        {/* save pins */}
        <div
          className="
          columns-2
          sm:columns-2
          md:columns-3
          lg:columns-4
          xl:columns-5
          gap-4
          space-y-4"
        >
          {data.map((pin) => (
            <Link key={pin._id} href={`/pin/${pin._id}`}>
              <div className="break-inside-avoid cursor-pointer group">

                <img
                  src={pin.image}
                  alt={pin.title}
                  style={{padding:"3% 3%"}}
                  className="w-full rounded-xl object-cover group-hover:opacity-80 transition"
                />

                <p className="text-white text-sm mt-4" style={{margin:"0% 4%"}}>
                  {pin.title}
                </p>

              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>

  );

}




// "use client";

// import { useState } from "react";
// import Link from "next/link";

// export default function ProfileTabs({
//   pins,
//   savedPins,
//   followers = [],
//   following = [],
// }) {
//   const [activeTab, setActiveTab] = useState("created");

//   return (
//     <div className="w-full">

//       {/* TABS */}
//       <div className="flex gap-6 border-b border-gray-700 mb-6">
//         <button
//           onClick={() => setActiveTab("created")}
//           className={`pb-2 ${
//             activeTab === "created"
//               ? "border-b-2 border-white"
//               : "text-gray-400"
//           }`}
//         >
//           Created
//         </button>

//         <button
//           onClick={() => setActiveTab("saved")}
//           className={`pb-2 ${
//             activeTab === "saved"
//               ? "border-b-2 border-white"
//               : "text-gray-400"
//           }`}
//         >
//           Saved
//         </button>

//         <button
//           onClick={() => setActiveTab("followers")}
//           className={`pb-2 ${
//             activeTab === "followers"
//               ? "border-b-2 border-white"
//               : "text-gray-400"
//           }`}
//         >
//           Followers ({followers.length})
//         </button>

//         <button
//           onClick={() => setActiveTab("following")}
//           className={`pb-2 ${
//             activeTab === "following"
//               ? "border-b-2 border-white"
//               : "text-gray-400"
//           }`}
//         >
//           Following ({following.length})
//         </button>
//       </div>

//       {/* CREATED PINS */}
//       {activeTab === "created" && (
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {pins.map((pin) => (
//             <Link key={pin._id} href={`/pin/${pin._id}`}>
//               <img
//                 src={pin.image}
//                 className="rounded-xl object-cover w-full h-48"
//               />
//             </Link>
//           ))}
//         </div>
//       )}

//       {/* SAVED PINS */}
//       {activeTab === "saved" && (
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {savedPins.map((pin) => (
//             <Link key={pin._id} href={`/pin/${pin._id}`}>
//               <img
//                 src={pin.image}
//                 className="rounded-xl object-cover w-full h-48"
//               />
//             </Link>
//           ))}
//         </div>
//       )}

//       {/* FOLLOWERS */}
//       {activeTab === "followers" && (
//         <div className="space-y-4">
//           {followers.map((user) => (
//             <Link
//               key={user._id}
//               href={`/profile/${user._id}`}
//               className="flex items-center gap-3 hover:bg-gray-800 p-2 rounded-lg"
//             >
//               <img
//                 src={user.image || "/default-avatar.png"}
//                 className="w-10 h-10 rounded-full"
//               />
//               <span>{user.name}</span>
//             </Link>
//           ))}
//         </div>
//       )}

//       {/* FOLLOWING */}
//       {activeTab === "following" && (
//         <div className="space-y-4">
//           {following.map((user) => (
//             <Link
//               key={user._id}
//               href={`/profile/${user._id}`}
//               className="flex items-center gap-3 hover:bg-gray-800 p-2 rounded-lg"
//             >
//               <img
//                 src={user.image || "/default-avatar.png"}
//                 className="w-10 h-10 rounded-full"
//               />
//               <span>{user.name}</span>
//             </Link>
//           ))}
//         </div>
//       )}

//     </div>
//   );
// }