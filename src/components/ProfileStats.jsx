// "use client";

// import { useState } from "react";
// import FollowModal from "./FollowModal";

// export default function ProfileStats({
//   pins,
//   followers,
//   following,
// }) {

//   const [modal, setModal] = useState(null);

//   return (

//     <>
//       <div className="flex gap-6 mt-4 text-white">

//         <div className="text-center">
//           <p className="font-bold text-lg">
//             {pins.length}
//           </p>
//           <p className="text-gray-400 text-sm">
//             Pins
//           </p>
//         </div>

//         <div
//           className="text-center cursor-pointer"
//           onClick={() => setModal("followers")}
//         >
//           <p className="font-bold text-lg">
//             {followers.length}
//           </p>
//           <p className="text-gray-400 text-sm">
//             Followers
//           </p>
//         </div>

//         <div
//           className="text-center cursor-pointer"
//           onClick={() => setModal("following")}
//         >
//           <p className="font-bold text-lg">
//             {following.length}
//           </p>
//           <p className="text-gray-400 text-sm">
//             Following
//           </p>
//         </div>

//       </div>

//       {/* FOLLOWERS MODAL */}
//       {modal === "followers" && (
//         <FollowModal
//           title="Followers"
//           users={followers}
//           onClose={() => setModal(null)}
//         />
//       )}

//       {/* FOLLOWING MODAL */}
//       {modal === "following" && (
//         <FollowModal
//           title="Following"
//           users={following}
//           onClose={() => setModal(null)}
//         />
//       )}

//     </>
//   );
// }






"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import FollowersModal from "./FollowersModal";

export default function ProfileStats({ user }) {

  const { data: session } = useSession();
  const [openFollowers, setOpenFollowers] = useState(false);
  const [openFollowing, setOpenFollowing] = useState(false);

  return (
    <>
      <div className="flex gap-6 mt-4 text-white">

        <div className="text-center">
          <p className="font-bold text-lg">
            {user.pins?.length || 0}
          </p>
          <p className="text-gray-400 text-sm">
            Pins
          </p>
        </div>

        <div
          className="text-center cursor-pointer"
          onClick={() => setOpenFollowers(true)}
        >
          <p className="font-bold text-lg">
            {user.followers?.length || 0}
          </p>
          <p className="text-gray-400 text-sm">
            Followers
          </p>
        </div>

        <div
          className="text-center cursor-pointer"
          onClick={() => setOpenFollowing(true)}
        >
          <p className="font-bold text-lg">
            {user.following?.length || 0}
          </p>
          <p className="text-gray-400 text-sm">
            Following
          </p>
        </div>

      </div>

      {/* Followers Popup */}
      {openFollowers && (
        <FollowersModal
          title="Followers"
          users={user.followers}
          currentUserId={session?.user?.id}
          onClose={() => setOpenFollowers(false)}
        />
      )}

      {/* Following Popup */}
      {openFollowing && (
        <FollowersModal
          title="Following"
          users={user.following}
          currentUserId={session?.user?.id}
          onClose={() => setOpenFollowing(false)}
        />
      )}
    </>
  );
}