import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export function createToken(payload) {
  console.log("JWT_SECRET:", process.env.JWT_SECRET);
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token) {
  return jwt.verify(token, SECRET);
}
