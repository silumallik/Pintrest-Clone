import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { registerSchema } from "@/schemas/auth.schema";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    // 🔥 ZOD VALIDATION
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, password } = parsed.data;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      username: email.split("@")[0] + Date.now(),         
    });

    return NextResponse.json(
      { message: "User registered successfully", user },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}

