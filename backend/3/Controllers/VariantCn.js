import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import ProductVariant from "../Models/ProductVariantMd.js";
import Variant from "../Models/VariantMd.js";
export const create = catchAsync(async (req, res, next) => {
  const variant = await Variant.create(req.body);
  res.status(201).json({
    status: "success",
    data: variant,
    message: "Variant created successfully",
  });
});
export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Variant, req.query, req.role)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = await features.execute();
  return res.status(200).json(result);
});
export const getOne = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Variant, req.query, req.role)
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
  const variant = await Variant.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({
    status: "success",
    data: variant,
    message: "Variant updated successfully",
  });
});
export const remove = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const products = await ProductVariant.find({ variantId: id });
  if (products.length > 0 ) {
    return next(
      new HandleERROR("Cannot delete variant with associated products", 400)
    );
  }
  await Variant.findByIdAndDelete(id);
  return res.status(200).json({
    status: "success",
    message: "Variant deleted successfully",
  });
});
