import mongoose from "mongoose";

const pinSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      maxlength: 500,
      default: "",
    },

    image: {
      type: String, // Cloudinary URL
      required: true,
    },

    category: {
      type: String,
      default: "general",
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],

  },
  { timestamps: true }
);

export default mongoose.models.Pin ||
  mongoose.model("Pin", pinSchema);
