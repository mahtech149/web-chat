import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign(
    { userId }, // represent payload
    process.env.JWT_SECRET_KEY, // represent secret key
    { expiresIn: "7d" }
  );

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, //en milliseconde
    httpOnly: true, //  prevent XSS attackes cross-site scripting attacks
    sameSite: "strict", //  CSRF attacks cross-site request forgery attacks
    secure: process.env.MODE_ENV !== "development",
  });
  console.log("token has been generate!");
  return token;
};
