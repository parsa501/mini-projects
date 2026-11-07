import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Product from "../Models/ProductMd.js";
import { __dirname } from "./../app.js";
import ProductVariant from "../Models/ProductVariantMd.js";
export const create = catchAsync(async (req, res, next) => {
  const productVariant = await ProductVariant.create(req.body);
  const product = await Product.findById(req.body.productId);
  product.productVariantIds?.push(productVariant._id);
  product.defaultProductVariantId =
    product?.defaultProductVariantId || productVariant._id;
  await product?.save();
  res.status(201).json({
    success: true,
    data: productVariant,
    message: "Product created successfully",
  });
});
export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(ProductVariant, req.query, req.role)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate([{ path: "variantId" }]);
  const result = await features.execute();
  return res.status(200).json(result);
});
export const getOne = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const productVariant = await ProductVariant.findById(id).populate([
    { path: "variantId" },
    { path: "productId", select: "title" },
  ]);
  return res.status(200).json({
    success: true,
    data: productVariant,
  });
});

export const update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const productVariant = await ProductVariant.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  return res.status(200).json({
    success: true,
    data: productVariant,
    message: "Product updated successfully",
  });
});

export const remove = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const productVariant = await ProductVariant.findByIdAndDelete(id);
  const product = await Product.findById(productVariant?.productId);
  product.productVariantIds = product?.productVariantIds.filter(
    (prv) => prv.toString() !== id
  );
  product.defaultProductVariantId =
    product?.defaultProductVariantId.toString() !== id
      ? product?.defaultProductVariantId
      : null;
  await product?.save();
  return res.status(200).json({
    success: true,
    data: productVariant,
    message:
      "Product Variant deleted successfully,please check the product for updated  default product variants",
  });
});
