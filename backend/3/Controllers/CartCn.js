import { catchAsync, HandleERROR } from "vanta-api";
import Cart from "../Models/CartMd.js";
import ProductVariant from "../Models/ProductVariantMd.js";

export const clear = catchAsync(async (req, res, next) => {
  const cart = await Cart.findOneAndUpdate(
    { userId: req.userId },
    { items: [], totalPrice: 0, totalPriceAfterDiscount: 0 },
    { new: true }
  );
  return res.status(200).json({
    success: true,
    data: cart,
    message: "Cart cleared successfully",
  });
});
export const getOne = catchAsync(async (req, res, next) => {
  const cart = await Cart.findOne({ userId: req.userId }).populate([
    { path: "items.productId", select: "title" },
    { path: "items.categoryId", select: "title" },
    {
      path: "items.productVariantId",
      select: "price quantity priceAfterDiscount discount variantId",
      populate: { path: "variantId", select: "type value" },
    },
  ]);
  let totalPrice = 0;
  let totalPriceAfterDiscount = 0;
  let removeItem;
  cart.items = cart?.items?.filter((item) => {
    item.cartQuantity =
      item?.cartQuantity > item?.productVariantId?.quantity
        ? item?.productVariantId?.quantity
        : item?.cartQuantity;
    if (item.cartQuantity === 0) {
      removeItem = true;
      return false;
    }
    totalPrice += item?.productVariantId?.price * item?.cartQuantity;
    totalPriceAfterDiscount +=
      item?.productVariantId?.priceAfterDiscount * item?.cartQuantity;
    item.price = item?.productVariantId?.price;
    item.priceAfterDiscount = item?.productVariantId?.priceAfterDiscount;
    return item;
  });
  cart.totalPrice = totalPrice;
  cart.totalPriceAfterDiscount = totalPriceAfterDiscount;
  const newCart = await cart.save();
  return res.status(200).json({
    success: true,
    data: newCart,
    message: removeItem
      ? "Some items were removed from the cart because they were out of stock."
      : "Cart retrieved successfully",
  });
});
export const addItem = catchAsync(async (req, res, next) => {
  const { productVariantId = null } = req.body;
  if (!productVariantId) {
    return next(new HandleERROR("Product variant ID is required", 400));
  }
  const productVariant = await ProductVariant.findById(
    productVariantId
  ).populate("productId");
  if (!productVariant) {
    return next(new HandleERROR("Product variant not found", 404));
  }
  const cart = await Cart.findOne({ userId: req.userId });
  let add = false;
  let newCartItems = [];
  for (let item of cart.items) {
    if (item.productVariantId.toString() == productVariantId) {
      if (item.cartQuantity >= productVariant.quantity) {
        return next(new HandleERROR("Product is out of stock", 400));
      }
      item.cartQuantity += 1;
      add = true;
    }
    newCartItems.push(item);
  }
  if (!add) {
    newCartItems.push({
      productId: productVariant.productId._id,
      productVariantId,
      cartQuantity: 1,
      categoryId: productVariant.productId.categoryId,
      price: productVariant.price,
      priceAfterDiscount: productVariant.priceAfterDiscount,
    });
  }
  cart.items = newCartItems;
  cart.totalPrice += productVariant.price;
  cart.totalPriceAfterDiscount += productVariant.priceAfterDiscount;
  const newCart = await cart.save();
  return res.status(200).json({
    success: true,
    data: newCart,
    message: "Item added to cart successfully",
  });
});
export const removeItem = catchAsync(async (req, res, next) => {
  const { productVariantId = null } = req.body;
  if (!productVariantId) {
    return next(new HandleERROR("Product variant ID is required", 400));
  }
  const productVariant = await ProductVariant.findById(productVariantId);
  if (!productVariant) {
    return next(new HandleERROR("Product variant not found", 404));
  }
  const cart = await Cart.findOne({ userId: req.userId });
  cart.items = cart?.items?.filter((item) => {
    if (item.productVariantId.toString() == productVariantId) {
      item.cartQuantity -= 1;
      cart.totalPrice -= item.price;
      cart.totalPriceAfterDiscount -= item.priceAfterDiscount;
      if (item.cartQuantity === 0) {
        return false;
      }
    }
    return item;
  });
  const newCart = await cart.save();
  
  return res.status(200).json({
    success: true,
    data: newCart,
    message: "Item removed from cart successfully",
  });
});
