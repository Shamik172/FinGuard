import User from "./user.model.js";

export const fetchUsers = async () => {
  return User.find().select("-password");
};