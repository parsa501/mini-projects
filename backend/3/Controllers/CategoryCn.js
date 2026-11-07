import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Product from "../Models/ProductMd.js";
import fs from "fs";
import { __dirname } from "./../app.js";
import Category from "../Models/CategoryMd.js";
export const create = catchAsync(async (req, res, next) => {
  const category = await Category.create(req.body);
  res.status(201).json({
    success: true,
    data: category,
    message: "Category created successfully",
  });
});
export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Category, req.query, req.role)
    .addManualFilters(req.role == "admin" ? {} : { isPublished: true })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = await features.execute();
  return res.status(200).json(result);
});
export const getOne = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Category, req.query, req.role)
    .addManualFilters(
      req.role == "admin"
        ? { _id: req.params.id }
        : { isPublished: true, _id: req.params.id }
    )
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = await features.execute();
  return res.status(200).json(result);
});
export const update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({
    success: true,
    data: category,
    message: "Category updated successfully",
  });
});
export const remove = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const products = await Product.find({ categoryId: id });
  const subCategories = await Category.find({ subCategory: id });
  if (products.length > 0 || subCategories.length > 0) {
    return next(
      new HandleERROR("Cannot delete category with associated products or subcategories", 400)
    );
  }
  const category = await Category.findByIdAndDelete(id);
  if (category.image) {
    fs.unlinkSync(`${__dirname}/Public/Uploads/${category.image}`);
  }
  return res.status(200).json({
    success: true,
    message: "Category deleted successfully",
  });
});
