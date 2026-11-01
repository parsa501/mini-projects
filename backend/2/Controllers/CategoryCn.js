import ApiFeatures, { catchAsync } from "vanta-api";
import Category from "../Models/CategoryMd.js";

export const create = catchAsync(async (req, res, next) => {
  const category = await Category.create(req.body);
  res.status(201).json({
    success: true,
    data: category,
  });
});
export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Category, req?.query, req?.role)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = await features.execute();
  return res.status(200).json(result);
});
export const getOne = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  return res.status(200).json({
    success: true,
    data: category,
  });
});
export const update = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  return res.status(200).json({
    success: true,
    data: category,
  });
});
export const remove = catchAsync(async (req, res, next) => {});
