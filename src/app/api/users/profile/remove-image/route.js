import connectDB from "@/lib/db";
import User from "@/models/User";
import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function DELETE() {

  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const user = await User.findById(session.user.id);

  if (!user) {
    return NextResponse.json(
      { message: "User not found" },
      { status: 404 }
    );
  }

  // Cloudinary image delete
  if (user.image && user.image.includes("cloudinary")) {

    try {

      const parts = user.image.split("/");
      const filename = parts[parts.length - 1];
      const publicId = "profiles/" + filename.split(".")[0];

      await cloudinary.uploader.destroy(publicId);

    } catch (err) {
      console.log("Cloudinary delete error:", err);
    }

  }

  // Remove image from DB
  user.image = "";

  await user.save();

  return NextResponse.json({
    message: "Profile image removed",
  });

}