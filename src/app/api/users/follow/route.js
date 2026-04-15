import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { toggleFollow } from "@/services/user.service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(req) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { userId } = await req.json();

    const currentUserId = session.user.id

    // const result = await toggleFollow(userId, session.user._id);
    const result = await toggleFollow(userId, currentUserId);

    const isFollowing = result.targetUser.followers.includes(
      session.user.id
    )

    //Newly Add
    // const isFollowing =
    //   currentUser.following.includes(targetUserId);

    console.log("Current User:", currentUserId);
    console.log("Target User:", userId);

    return NextResponse.json(result);
  }
  catch (error) {
    console.log(`kiya hey : ${error}`)
    return NextResponse.json(
      { message: error }, { stauts: 500 }
    )
  }
}



