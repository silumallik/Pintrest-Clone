import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(req) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { pinId } = await req.json();

    const user = await User.findById(session.user.id);

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const alreadySaved = user.savedPins.includes(pinId);

    if (alreadySaved) {
      // Unsave
      user.savedPins.pull(pinId);
    } else {
      // Save
      user.savedPins.push(pinId);
    }

    await user.save();

    return NextResponse.json({
      saved: !alreadySaved,
    });

  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}




