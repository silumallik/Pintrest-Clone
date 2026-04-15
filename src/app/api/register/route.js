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
      username: email.split("@")[0] + Date.now(),         //slove error
    });

    return NextResponse.json(
      { message: "User registered successfully", user },
      { status: 201 }
    );
  } catch (error) {
    console.log("FULL ERROR:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}





// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import User from "@/models/User";
// import bcrypt from "bcryptjs";

// export async function POST(req) {
//   try {
//     await connectDB();

//     const body = await req.json();
//     const { name, email, password } = body;

//     // Validation
//     if (!name || !email || !password) {
//       return NextResponse.json(
//         { message: "All fields are required" },
//         { status: 400 }
//       );
//     }

//     // Check existing user
//     const existingUser = await User.findOne({
//       email: email.toLowerCase(),
//     });

//     if (existingUser) {
//       return NextResponse.json(
//         { message: "User already exists" },
//         { status: 400 }
//       );
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create user
//     await User.create({
//       name,
//       email: email.toLowerCase(),
//       password: hashedPassword,
//     });

//     return NextResponse.json(
//       { message: "User registered successfully" },
//       { status: 201 }
//     );

//   } catch (error) {
//     console.log("REGISTER ERROR:", error);
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
