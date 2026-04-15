// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET;

// export function generateToken(userId) {
//   return jwt.sign({ id: userId }, JWT_SECRET, {
//     expiresIn: "7d",
//   });
// }

// export function verifyToken(token) {
//   try {
//     return jwt.verify(token, JWT_SECRET);
//   } catch (error) {
//     return null;
//   }
// }




import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const signToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};


