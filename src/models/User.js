import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    username: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String, // bcrypt hashed (null if OAuth)
    },

    image: {
      type: String, // Cloudinary profile image
      default: "/default-avatar.png",
    },

    bio: {
      type: String,
      maxlength: 100,
      default: "",
    },

    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default : [],
      },
    ],

    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default : [],
      },
    ],

    savedPins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pin",
      },
    ],

    pins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pin",
      },
    ],

    provider: {
      type: String, // google / credentials
      default: "credentials",
    },
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model("User", userSchema);
