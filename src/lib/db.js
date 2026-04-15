// export const connectionstrt = "mongodb+srv://dilu:vsdilu865@cluster1.zpgle1p.mongodb.net/userDB?appName=Cluster1"

// export const users = [];
// MONGODB_URI="mongodb+srv://dilu:vsdilu865@cluster1.zpgle1p.mongodb.net/userDB?appName=Cluster1"
// JWT_SECRET="5f2c9a8d3b7e1a6b4c2d9f0a123456789abcdef9876543210abcd1234"

// working code
// import mongoose from "mongoose";

// const connectDB = async () => {
//   if (mongoose.connection.readyState) return;

//   try {
//     await mongoose.connect(process.env.MONGODB_URI);
//     console.log("MongoDB Connected");
//   } catch (error) {
//     console.error("DB Error:", error);
//   }
// };

// export default connectDB;



// trying code
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;



