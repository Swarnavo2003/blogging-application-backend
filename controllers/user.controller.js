import User from "../models/user.js";
import bcrypt from "bcrypt";

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({
        message: "No Users Found",
      });
    }
    return res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      blogs: [],
    });
    await user.save();

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        message: "User dosen't exists",
      });
    }

    const isPassword = bcrypt.compare(password, existingUser.password);
    if (!isPassword) {
      return res.status(404).json({
        message: "Incorrect password",
      });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
