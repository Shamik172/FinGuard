import * as service from "./dashboard.service.js";

export const summary = async (req, res, next) => {
  try {
    const data = await service.getSummary(req.user);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const category = async (req, res, next) => {
  try {
    const data = await service.getCategoryBreakdown(req.user);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const trends = async (req, res, next) => {
  try {
    const data = await service.getMonthlyTrends(req.user);
    res.json(data);
  } catch (err) {
    next(err);
  }
};