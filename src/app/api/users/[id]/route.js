import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { getUserById } from "@/services/user.service";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";



//access user working code
// export async function GET(req, context) {
//   await connectDB();

//   const { id } = await context.params;   // ✅ FIX

//   if (!id) {
//     console.log("id nehi aya hey")
//     return NextResponse.json(
//       { message: "Invalid ID" },
//       { status: 400 }
//     );
//   }

//   const user = await getUserById(id);

//   if (!user) {
//     console.log("user nehi aya hey")
//     return NextResponse.json(
//       { message: "User not found" },
//       { status: 404 }
//     );
//   }
//   console.log("user mil gaya")
//   return NextResponse.json(user);
// }

//trying code
export async function GET(req, context) {

  await connectDB();

  const { id } = await context.params;

  if (!id) {
    return NextResponse.json(
      { message: "Invalid ID" },
      { status: 400 }
    );
  }

  const session = await getServerSession(authOptions);

  const currentUserId = session?.user?.id;

  // if (!session) return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  console.log("SESSION:", session);
  const user = await getUserById(id, currentUserId);
  if (!user) {
    return NextResponse.json(
      { message: "User not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(user);
}

// update user
export async function PUT(req, { params }) {

  await connectDB();

  const { name, username } = await req.json();

  const user = await User.findByIdAndUpdate(
    params.id,
    { name, username },
    { new: true }
  );

  return NextResponse.json(user);

}





