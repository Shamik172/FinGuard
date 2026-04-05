import Record from "./record.model.js";

export const createRecord = async (data, userId) => {
  return Record.create({
    ...data,
    createdBy: userId,
  });
};

export const getRecords = async (user, query) => {
  const filter = {};

  // Role-based filter
  if (user.role !== "ADMIN") {
    filter.createdBy = user._id;
  }

  // Type filter
  if (query.type) {
    filter.type = query.type;
  }

  // Category filter
  if (query.category) {
    filter.category = query.category;
  }

  // Date range filter
  if (query.startDate || query.endDate) {
    filter.date = {};

    if (query.startDate) {
      filter.date.$gte = new Date(query.startDate);
    }

    if (query.endDate) {
      filter.date.$lte = new Date(query.endDate);
    }
  }

  return Record.find(filter).sort({ date: -1 });
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