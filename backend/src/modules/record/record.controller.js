import * as service from "./record.service.js";

export const create = async (req, res, next) => {
  try {
    const record = await service.createRecord(req.body, req.user._id);
    res.status(201).json(record);
  } catch (err) {
    next(err);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const records = await service.getRecords(req.user, req.query);
    res.json(records);
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const record = await service.updateRecord(
      req.params.id,
      req.body,
      req.user
    );
    res.json(record);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    await service.deleteRecord(req.params.id, req.user);
    res.json({ message: "Record deleted" });
  } catch (err) {
    next(err);
  }
};