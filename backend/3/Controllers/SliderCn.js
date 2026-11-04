import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import fs from "fs";
import { __dirname } from "./../app.js";
import Slider from "../Models/SliderMd.js";
export const create = catchAsync(async (req, res, next) => {
  const slider = await Slider.create(req.body);
  res.status(201).json({
    status: "success",
    data: slider,
    message: "Slider created successfully",
  });
});
export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Slider, req.query, req.role)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = await features.execute();
  return res.status(200).json(result);
});
export const remove = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const slider = await Slider.findByIdAndDelete(id);
  if (slider.image) {
    fs.unlinkSync(`${__dirname}/Public/Uploads/${slider.image}`);
  }
  return res.status(200).json({
    status: "success",
    message: "Slider deleted successfully",
  });
});
