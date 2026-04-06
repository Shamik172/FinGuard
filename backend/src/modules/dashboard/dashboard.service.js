import Record from "../record/record.model.js";

export const getSummary = async (user) => {
  const match = {};

  // Role-based filtering
  if (user.role !== "ADMIN") {
    match.createdBy = user._id;
  }

  const result = await Record.aggregate([
    { $match: match },
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" },
      },
    },
  ]);

  let income = 0;
  let expense = 0;

  result.forEach((item) => {
    if (item._id === "INCOME") income = item.total;
    if (item._id === "EXPENSE") expense = item.total;
  });

  return {
    income,
    expense,
    balance: income - expense,
  };
};


export const getCategoryBreakdown = async (user) => {
  const match = {};

  if (user.role !== "ADMIN") {
    match.createdBy = user._id;
  }

  return Record.aggregate([
    { $match: match },
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" },
      },
    },
    { $sort: { total: -1 } },
  ]);
};

export const getMonthlyTrends = async (user) => {
  const match = {};

  if (user.role !== "ADMIN") {
    match.createdBy = user._id;
  }

  return Record.aggregate([
    { $match: match },
    {
      $group: {
        _id: {
          month: { $month: "$date" },
          year: { $year: "$date" },
        },
        total: { $sum: "$amount" },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ]);
};