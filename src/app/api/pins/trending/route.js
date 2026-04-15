import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
// import connectDB from "@/lib/connectDB";
import Pin from "@/models/Pin";

export async function GET() {
  try {
    await connectDB();

    const pins = await Pin.find()
      .sort({ views: -1 })
      .limit(8);

    return NextResponse.json(pins);
  } catch (error) {
    return NextResponse.json(
      { error: "Trending failed" },
      { status: 500 }
    );
  }
}