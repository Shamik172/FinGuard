import { fetchUsers } from "./user.service.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await fetchUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};