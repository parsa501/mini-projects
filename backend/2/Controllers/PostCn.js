import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Post from "../Models/PostMd.js";
import fs from 'fs'
import { __dirname } from "../app.js";
export const create = catchAsync(async (req, res, next) => {
  const post = await Post.create(req.body);
  res.status(201).json({
    success: true,
    data: post,
  });
});
export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Post, req?.query, req?.role)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = await features.execute();
  return res.status(200).json(result);
});
export const getOne = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Post, req?.query, req?.role)
    .addManualFilters({
      _id: req.params.id,
    })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate({ path: "categoryId", select: "title" });
  const result = await features.execute();
  return res.status(200).json(result);
});
export const update = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  return res.status(200).json({
    success: true,
    data: post,
  });
});
export const remove = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findByIdAndDelete(id);
  if (post?.image) {
    fs.unlinkSync(`${__dirname}/Public/Uploads/${post.image}`);
  }
  return res.status(204).json({
    success: true,
    data: null,
  });
});
