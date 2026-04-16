import connectDB from "@/lib/db";
import User from "@/models/User";
import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export async function PUT(req) {

  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const formData = await req.formData();

  const name = formData.get("name");
  const username = formData.get("username");
  const bio = formData.get("bio");
  const file = formData.get("image");

  let imageUrl;

  if (file && file.size > 0) {

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise((resolve, reject) => {

      cloudinary.uploader.upload_stream(

        {
          folder: "profiles",
        },

        (error, result) => {

          if (error) reject(error);

          else resolve(result);

        }

      ).end(buffer);

    });

    imageUrl = uploadResult.secure_url;

  }

  const updateData = {
    name,
    username,
    bio,
  };

  if (imageUrl) {
    updateData.image = imageUrl;
  }

  const user = await User.findByIdAndUpdate(
    session.user.id,
    updateData,
    { new: true }
  );

  return NextResponse.json(user);

}
