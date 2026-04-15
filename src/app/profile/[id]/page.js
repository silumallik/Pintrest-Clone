import { notFound } from "next/navigation";
import Link from "next/link";
import FollowButton from "@/components/FollowButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import ProfileTabs from "@/components/ProfileTabs"
import LogoutButton from "@/components/LogoutButton";
import ProfileStats from "@/components/ProfileStats";


async function getUser(id) {
  const res = await fetch(`http://localhost:3000/api/users/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function ProfilePage({ params }) {

  const { id } = await params;

  const session = await getServerSession(authOptions);

  if (!id) return notFound();

  const user = await getUser(id);

  if (!user) return notFound();

  const isFollowing = user.followers?.includes(session?.user?.id);
  
  const isOwnProfile = session?.user?.id === user._id;

  return (

    <div className="max-w-5.5xl mx-auto py-10 px-4 ">

      {/* ================= PROFILE HEADER ================= */}

      <div className="flex flex-col items-center text-center mb-10 justify-center mt-10" style={{ width: "100vw", marginTop:"1%" }}>

        {/* PROFILE IMAGE */}
        <img
          src={user.image || "/default-avatar.png"}
          alt={user.name}
          className="rounded-full object-cover border-4 border-gray-700 shadow-lg"
          style={{ width: "12%", height: "12%" }}
        />

        {/* NAME */}
        <h1 className="text-3xl font-bold text-white mt-4">
          {user.name}
        </h1>

        {/* USERNAME */}
        {user.username && (
          <p className="text-gray-400">
            @{user.username}
          </p>
        )}

        {user.bio && (
          <p className="text-gray-400 mt-2">
            {user.bio}
          </p>
        )}

        {/* Profile Btn Show */}
        {session && (
          isOwnProfile ? (
            <>
              <Link href={`/profile/${user._id}/edit`}>
                <button className="mt-4 px-6 py-2 bg-blue-400 hover:bg-blue-700 font-semibold transition"
                  style={{ padding: "3px 13px", borderRadius: "1vh", marginTop: "4px",cursor:"pointer" }}
                >
                  Edit Profile
                </button>
              </Link>

              <LogoutButton />

            </>
          ) : (
            <FollowButton
              targetUserId={user._id.toString()}
              initialIsFollowing={isFollowing}
            />
          )
        )}

        {/* STATS OF PIN, FOLLOERS, FOLLOWING */}
        <ProfileStats user={user} />

      </div>

      {/* ================= PROFILE TABS ================= */}

      <ProfileTabs
        pins={user.pins || []}
        savedPins={user.savedPins || []}
      />

    </div>

  );

}