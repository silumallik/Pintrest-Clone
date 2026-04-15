import Pin from "@/models/Pin";
import Comment from "@/models/Comment";
import User from "@/models/User";

/* ================= CREATE PIN ================= */

export const createPin = async (data, userId) => {
  const pin = await Pin.create({
    ...data,
    owner: userId,
  });
  // newly add kiya profile mey post show kar ne ke liye
  await User.findByIdAndUpdate(userId, {
    $push: { pins: pin._id },
  });

  return pin;
};

/* ================= GET ALL PINS ================= */

export const getAllPins = async () => {
  return await Pin.find()
    .populate("owner", "name image")
    .sort({ createdAt: -1 });
};

/* ================= GET SINGLE PIN ================= */
//working code
// export const getPinById = async (id) => {
//   return await Pin.findById(id)
//     .populate("owner", "name image")
//     .populate({
//       path: "likes",
//       select: "name",
//     });
// };

// just working code
// export const getPinById = async (id) => {

//   return await Pin.findById(id)
//     .populate("owner", "name image")
//     .populate({
//       path: "comments",
//       populate: {
//         path: "owner",
//         select: "name image",
//       },
//     });
// };

//trying
export const getPinById = async (id) => {
  const pin = await Pin.findById(id)
    .populate("owner", "name image")
    .populate("likes", "name image")
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "name image",
      },
      options: { sort: { createdAt: -1 } }, // newest first
    })
    .lean();

  return pin;
};

/* ================= LIKE PIN ================= */

export const toggleLike = async (pinId, userId) => {
  const pin = await Pin.findById(pinId);

  if (!pin) throw new Error("Pin not found");

  const alreadyLiked = pin.likes.includes(userId);

  if (alreadyLiked) {
    pin.likes.pull(userId);
  } else {
    pin.likes.push(userId);
  }

  await pin.save();

  return pin;
};
