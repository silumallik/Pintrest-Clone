// import { NextResponse } from "next/server";
// import connectDB from "@/lib/connectDB";
// import Pin from "@/models/Pin";

// export async function GET(req) {
//   try {
//     await connectDB();

//     const { searchParams } = new URL(req.url);
//     const query = searchParams.get("q");

//     if (!query) {
//       return NextResponse.json([]);
//     }

//     const pins = await Pin.find({
//       title: { $regex: query, $options: "i" },
//     }).sort({ createdAt: -1 });

//     return NextResponse.json(pins);
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Search failed" },
//       { status: 500 }
//     );
//   }
// }



import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
// import connectDB from "@/lib/connectDB";
import Pin from "@/models/Pin";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "";
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = 12;
    const skip = (page - 1) * limit;

    const pins = await Pin.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } },
      ],
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json(pins);
  } catch (error) {
    return NextResponse.json(
      { error: "Search failed" },
      { status: 500 }
    );
  }
}