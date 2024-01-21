import express from "express";
import { generateToken } from "../utils.js";
import { signup, login } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    const userDetails = req.body;

    if (
      !userDetails.email ||
      !userDetails.password ||
      !userDetails.profilePictureUrl ||
      !userDetails.username
    ) {
      res
        .status(401)
        .json({ message: "Signup failed. Missing some required fields." });
    }

    const createdUser = await signup(userDetails);
    const token = generateToken(createdUser._id);

    res.status(201).json({ message: "Signup Successful", createdUser, token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res
        .status(401)
        .json({ success: false, message: "Please Enter Email & Password" });
    }

    const user = await login(email, password);
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login Successful",
      user: user,
      token: token,
    });
  } catch (error) {
    if (error.message === "Authentication failed. User not found") {
      res
        .status(401)
        .json({ message: "Authentication failed. User not found" });
    } else if (error.message === "Invalid credentials") {
      res.status(401).json({ message: "Invalid credentials" });
    } else {
      res
        .status(500)
        .json({ message: "Something went wrong", error: error.message });
    }
  }
});

export default authRouter;
