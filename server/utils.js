import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET);
};

const verifyToken = (token) => {
  try {
    console.log(token)
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded);
    return decoded;
  } catch (error) {
    throw new Error("Invalid Token", error);
  }
};

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

const decryptPassword = async (password, hashedPassword) => {
  const passwordMatched = await bcrypt.compare(password, hashedPassword);

  return passwordMatched;
};

export { generateToken, verifyToken, encryptPassword, decryptPassword };
