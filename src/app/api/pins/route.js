import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { createPinSchema } from "@/schemas/pin.schema";
import { createPin, getAllPins } from "@/services/pin.service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Pin from "@/models/Pin";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;

    const limit = 10;

    const skip = (page - 1) * limit;

    const pins = await Pin.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // const { searchParams } = new URL(req.url);
    // const exclude = searchParams.get("exclude");
    // const page = parseInt(searchParams.get("page")) || 1;
    // const limit = 10;

    // let query = {};

    // if (exclude) {
    //   query._id = { $ne: exclude };
    // }

    // const pins = await Pin.find(query)
    //   .sort({ createdAt: -1 })
    //   .skip((page - 1) * limit)
    //   .limit(limit);

    return NextResponse.json(pins);
  }
  catch (error) {
    console.log(error)
    return NextResponse.json({
      message: error.message
    }, { status: 500 })
  }
}


export async function POST(req) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const parsed = createPinSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const pin = await createPin(parsed.data, session.user.id);

    return NextResponse.json(pin, { status: 201 });

  } catch (error) {
    console.log("PIN CREATE ERROR:", error);
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

