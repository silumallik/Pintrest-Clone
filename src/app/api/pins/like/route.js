// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import { toggleLike } from "@/services/pin.service";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/authOptions";

// export async function POST(req) {
//   await connectDB();

//   const session = await getServerSession(authOptions);
//   if (!session)
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

//   const { pinId } = await req.json();

//   const updatedPin = await toggleLike(pinId, session.user._id);

//   return NextResponse.json(updatedPin);
// }


import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { toggleLike } from "@/services/pin.service";
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

    const updatedPin = await toggleLike(
      pinId,
      session.user.id   // ✅ FIXED
    );

    return NextResponse.json({
      likes: updatedPin.likes.length,
      liked: updatedPin.likes.includes(session.user.id),
    });

  } catch (error) {

    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );

  }

}