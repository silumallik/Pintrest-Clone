import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      message: "Logout successful (client should remove token)",
    },
    { status: 200 }
  );
}
