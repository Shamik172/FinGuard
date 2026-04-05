import Record from "./record.model.js";

export const createRecord = async (data, userId) => {
  return Record.create({
    ...data,
    createdBy: userId,
  });
};

export const getRecords = async (user) => {
  if (user.role === "ADMIN") {
    return Record.find();
  }

  return Record.find({ createdBy: user._id });
};

export const updateRecord = async (id, data, user) => {
  const record = await Record.findById(id);

  if (!record) throw new Error("Record not found");

  if (
    user.role !== "ADMIN" &&
    record.createdBy.toString() !== user._id.toString()
  ) {
    throw new Error("Not authorized");
  }

  Object.assign(record, data);
  return record.save();
};

export const deleteRecord = async (id, user) => {
  const record = await Record.findById(id);

  if (!record) throw new Error("Record not found");

  if (
    user.role !== "ADMIN" &&
    record.createdBy.toString() !== user._id.toString()
  ) {
    throw new Error("Not authorized");
  }

  await record.deleteOne();
};