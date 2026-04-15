import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { getPinById } from "@/services/pin.service";
import Pin from "@/models/Pin";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const pin = await getPinById(id);
    // const pin = await getPinById(params.id);

    if (!pin)
      return NextResponse.json({ message: "Pin not found" }, { status: 404 });

    return NextResponse.json(pin);
  } catch (error) {
    return NextResponse.json({
      message: error
    })
  }

}


export async function DELETE(req, { params }) {
  try {

    await connectDB();

    const session = await getServerSession(authOptions);

    // login check
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const pin = await Pin.findById(id);

    // pin exist check
    if (!pin) {
      return NextResponse.json(
        { message: "Pin not found" },
        { status: 404 }
      );
    }

    // owner check
    // if (pin.user.toString() !== session.user.id) {
    //   return NextResponse.json(
    //     { message: "You can't delete this pin" },
    //     { status: 403 }
    //   );
    // }

    // delete pin
    // await Pin.findByIdAndDelete(id);

    await Pin.findOneAndDelete({
      _id: id,
      owner: session.user.id
    });

    return NextResponse.json({
      message: "Pin deleted successfully",
    });

  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );

  }
}
