import { catchAsync } from "vanta-api";
import Order from "../Models/OrderMd";

export const reportByStatus = catchAsync(async (req, res, next) => {
  let { startDate = null, endDate = null, limit = 10, page = 1 } = req.query;
  const skip = (page - 1) * limit;
  const now = new Date();
  startDate = startDate
    ? new Date(startDate)
    : new Date(now.setDate(now.getDate() - 30));
  endDate = endDate ? new Date(endDate) : now;
  const reportByStatus = await Order.aggregate([
    { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
    {
      $group: {
        _id: "$status",
        totalOrders: { $sum: 1 },
        totalRevenue: { $sum: "$totalPriceAfterDiscount" },
        avgOrderValue: { $avg: "$totalPriceAfterDiscount" },
      },
    },
    { $sort: { totalRevenue: -1 } },
    { $skip: +skip },
    { $limit: +limit },
  ]);
  return res.status(200).json({
    success: true,
    results: reportByStatus.length,
    data: {
      reportByStatus,
    },
  });
});
export const orderMonthly = catchAsync(async (req, res, next) => {
  const monthlySales = await Order.aggregate([
    {
      $match: { status: "success" },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        totalOrders: { $sum: 1 },
        totalRevenue: { $sum: "$totalPriceAfterDiscount" },
        totalAvg: { $avg: "$totalPriceAfterDiscount" },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ]);
  return res.status(200).json({
    success: true,
    results: monthlySales.length,
    data: {
      monthlySales,
    },
  });
});

export const userMostCountOrder = catchAsync(async (req, res, next) => {
  const { limit = 10, page = 1 } = req.query;
  const skip = (page - 1) * limit;
  const mostCountOrder = await Order.aggregate([
    {
      $match: { status: "success" },
    },
    {
      $group: {
        _id: "$userId",
        totalOrders: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "userInfo",
      },
    },
    { $unwind: "$userInfo" },
    { $sort: { totalOrders: -1 } },
     { $skip: skip },
    { $limit: limit },
   
  ]);
  return res.status(200).json({
    success: true,
    results: mostCountOrder.length,
    data: {
      mostCountOrder,
    },
  });
});
export const userMostTotalOrderPrice = catchAsync(async (req, res, next) => {
  const { limit = 10, page = 1 } = req.query;
  const skip = (page - 1) * limit;
  const mostTotalOrderPrice = await Order.aggregate([
    {
      $group: {
        _id: "$userId",
        totalRevenue: { $sum: "$totalPriceAfterDiscount" },
      },
    },
    { $sort: { totalRevenue: -1 } },
    { $skip: skip },

    { $limit: limit },
  ]);
  return res.status(200).json({
    success: true,
    results: mostTotalOrderPrice.length,
    data: {
      mostTotalOrderPrice,
    },
  });
});
export const orderPerCategory = catchAsync(async (req, res, next) => {
  const monthlySales = await Order.aggregate([
    {
      $match: { status: "success" },
    },
    {
      $group: {
        _id: "$items.categoryId",
        totalOrders: { $sum: 1 },
        totalRevenue: { $sum: "$totalPriceAfterDiscount" },
      },
    },
    { $sort: { totalRevenue: -1 } },
  ]);
  return res.status(200).json({
    success: true,
    results: monthlySales.length,
    data: {
      monthlySales,
    },
  });
});
export const totalDiscountIdUsedAmount = catchAsync(async (req, res, next) => {
  const { limit = 10, page = 1 } = req.query;
  const skip = (page - 1) * limit;
  const totalDiscountIdUsedAmount = await Order.aggregate([
    {
      $match: { status: "success" },
    },
    {
      $group: {
        _id: "$discountId",
        totalUsed: { $sum: 1 },
        totalAmountDiscount: { $sum: { $subtract: ["$totalPrice", "$totalPriceAfterDiscount"] } },
      },
    },
    { $sort: { totalUsed: -1 } },
    { $skip: skip },
    { $limit: limit },
  ]);
  return res.status(200).json({
    success: true,
    results: totalDiscountIdUsedAmount.length,
    data: {
      totalDiscountIdUsedAmount,
    },
  });
});