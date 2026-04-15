import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file)
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "pinterest-pro" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(buffer);
    });

    return NextResponse.json({
      imageUrl: uploadResult.secure_url,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Upload failed", error: error.message },
      { status: 500 }
    );
  }
}




// export async function POST(req) {
//   try {
//     const formData = await req.formData();
//     const file = formData.get("file");

//     if (!file) {
//       return NextResponse.json(
//         { message: "No file uploaded" },
//         { status: 400 }
//       );
//     }

//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     const uploadResponse = await new Promise((resolve, reject) => {
//       cloudinary.uploader
//         .upload_stream({}, (error, result) => {
//           if (error) reject(error);
//           else resolve(result);
//         })
//         .end(buffer);
//     });

//     return NextResponse.json({
//       url: uploadResponse.secure_url,
//     });

//   } catch (error) {
//     console.log("UPLOAD ERROR:", error);
//     return NextResponse.json(
//       { message: "Upload failed" },
//       { status: 500 }
//     );
//   }
// }
