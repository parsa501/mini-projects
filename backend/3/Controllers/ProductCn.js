import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Product from "../Models/ProductMd.js";
import { __dirname } from "./../app.js";
import User from "../Models/UserMd.js";
export const create = catchAsync(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    status: "success",
    data: product,
    message: "Product created successfully",
  });
});
export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Category, req.query, req.role)
    .addManualFilters(req.role == "admin" ? {} : { isPublished: true })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate([
      { path: "categoryId", select: "title" },
      { path: "brandId", select: "title" },
      { path: "defaultProductVariantId",populate: { path: "variantId"} },
    ]);
  const result = await features.execute();
  return res.status(200).json(result);
});
export const getOne = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate([
    { path: "categoryId", select: "title" },
    { path: "brandId", select: "title" },
    { path: "defaultProductVariantId", populate: { path: "variantId"} },
    { path: "productVariantIds", populate: { path: "variantId"} }
  ]);
  let favProduct=false
  let boughtProduct=false
  let ratedProduct=false
  if(req?.userId){
    const user=await User.findById(req.userId);
    favProduct=user?.favoriteProducts?.find(pr=>pr.toString()==id)?true:false;
    boughtProduct=user?.boughtProducts?.find(pr=>pr.toString()==id)?true:false;
    ratedProduct=user?.ratedProducts?.find(pr=>pr.productId.toString()==id)?true:false;
  }
  return res.status(200).json({
    success:true,
    data:product,
    favProduct,
    boughtProduct,
    ratedProduct
  });
});

export const update=catchAsync(async (req,res,next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  return res.status(200).json({
    success:true,
    data:product,
    message:"Product updated successfully"
  });
})
export const favProduct=catchAsync(async (req,res,next) => {
  const { id } = req.params;
    const userId=req.userId
    const user=await User.findById(userId);
    const alreadyFav = user?.favoriteProducts?.find(pr => pr.toString() === id);
    if(alreadyFav){
        user.favoriteProducts = user.favoriteProducts.filter(pr => pr.toString() !== id);
    }else{
        user.favoriteProducts.push(id);
    }
    await user.save();
    return res.status(200).json({
      success:true,
      message:"add to favorites successfully"
    });
})

