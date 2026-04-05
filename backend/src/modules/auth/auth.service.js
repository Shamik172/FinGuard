import jwt from "jsonwebtoken";
import User from "../user/user.model.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const registerUser = async ({ name, email, password, role }) => {
  const exists = await User.findOne({ email });
  if (exists) throw new Error("User already exists");

  const user = await User.create({ name, email, password, role });

  return {
    user,
    token: generateToken(user._id),
  };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    throw new Error("Invalid credentials");
  }

  return {
    user,
    token: generateToken(user._id),
  };
};