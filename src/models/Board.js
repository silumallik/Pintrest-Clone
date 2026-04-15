// import mongoose from "mongoose";

// const boardSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     description: {
//       type: String,
//       default: "",
//     },

//     owner: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     pins: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Pin",
//       },
//     ],

//     isPrivate: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.Board ||
//   mongoose.model("Board", boardSchema);
