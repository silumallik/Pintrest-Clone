import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Comment from "@/models/Comment";
import Pin from "@/models/Pin";
import { commentSchema } from "@/schemas/comment.schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(req) {
  try {
    await connectDB();
    // GET SESSION
    const session = await getServerSession(authOptions);

    // ✅ check session
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const parsed = commentSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const comment = await Comment.create({
      text: parsed.data.text,
      pin: parsed.data.pinId,
      user: session.user.id,
    });

    await Pin.findByIdAndUpdate(parsed.data.pinId, {
      $push: { comments: comment._id },
      $inc: { commentsCount: 1 },
    });


    // ✅ populate user
    const populatedComment = await Comment.findById(comment._id)
      .populate("user", "name image");

    return NextResponse.json(populatedComment, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
