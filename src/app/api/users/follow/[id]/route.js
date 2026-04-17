import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { toggleFollow } from "@/services/followService";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(req, context) {

  try {

    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // ✅ params ko unwrap karo
    const { id } = await context.params;

    const currentUserId = session.user.id;
    const targetUserId = id;

    const result = await toggleFollow(currentUserId, targetUserId);
    
    return NextResponse.json(result);

  } catch (error) {

    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );

  }

}
