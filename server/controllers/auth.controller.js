import { User } from "../models/user.model.js";
import { encryptPassword, decryptPassword } from "../utils.js";

async function signup(userDetails) {
  try {
    const user = new User(userDetails);
    const hashedPassword = await encryptPassword(user.password);
    user.password = hashedPassword;
    const createdUser = await user.save();
    return createdUser;
  } catch (error) {
    throw error;
  }
}

async function login(email, password) {
  const userFound = await User.findOne({ email: email });

  if (!userFound) {
    throw new Error("Authentication failed. User not found");
  }

  try {
    const passwordMatched = await decryptPassword(password, userFound.password);

    if (passwordMatched) {
      return userFound;
    } else {
      throw new Error({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    throw error;
  }
}
export { login, signup };
