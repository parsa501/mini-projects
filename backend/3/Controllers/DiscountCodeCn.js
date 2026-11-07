import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import DiscountCode from "../Models/DiscountCodeMd.js";

export const create = catchAsync(async (req, res, next) => {
  const discountCode = await DiscountCode.create(req.body);
  res.status(201).json({
    success: true,
    data: discountCode,
    message: "Discount code created successfully",
  });
});
export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(DiscountCode, req.query, req.role)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = await features.execute();
  return res.status(200).json(result);
});
export const getOne = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(DiscountCode, req.query, req.role)
    .addManualFilters({ _id: req.params.id })
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
  const { discountType = null, value = null, ...otherData } = req?.body;
  const discountCode = await DiscountCode.findById(id);

  if (
    ((discountType && discountType != discountCode.discountType) ||
      (value && value != discountCode.value)) &&
    discountCode.userIdsUsed?.length > 0
  ) {
    return next(
      new HandleERROR(
        "Cannot update discountType or value that has been used",
        400
      )
    );
  }
  const newDiscountCode = await DiscountCode.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  return res.status(200).json({
    success: true,
    data: newDiscountCode,
    message: "Discount code updated successfully",
  });
});
export const remove = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const discountCode = await DiscountCode.findByIdAndDelete(id);
  if (discountCode.userIdsUsed?.length > 0) {
    return next(
      new HandleERROR("Cannot delete discount code that has been used", 400)
    );
  }
  await discountCode.remove();
  return res.status(200).json({
    success: true,
    message: "Discount code deleted successfully",
  });
});

export const checkCode = (discount, totalPrice, userId) => {
  if (!discount?.isPublish)
    return {
      success: false,
      message: `This discount code is not available`,
    };
  if (discount?.minPrice && discount?.minPrice > totalPrice) {
    return {
      success: false,
      message: `Minimum price for this discount code is ${discount?.minPrice}`,
    };
  }
  if (discount?.maxPrice && discount?.maxPrice < totalPrice) {
    return {
      success: false,
      message: `Maximum price for this discount code is ${discount?.maxPrice}`,
    };
  }
  if (
    discount?.userIdsUsed?.filter((ui) => ui == userId).length >=
    discount?.maxUsedCount
  ) {
    return {
      success: false,
      message: `You have reached the maximum usage limit for this discount code`,
    };
  }
  if (discount.expireTime < Date.now() || discount.startTime > Date.now()) {
    return {
      success: false,
      message: `This discount code is invalid On this date`,
    };
  }
  return {
    success: true,
    message: `Discount code is valid`,
  };
};
export const checkDiscountCode = catchAsync(async (req, res, next) => {
  const { code = null, totalPrice = null } = req.body;
  const discount = await DiscountCode.findOne({ code });
  if (!discount) {
    return next(new HandleERROR("Discount code not found", 404));
  }
  const check = checkCode(discount, totalPrice, req.userId);
  if (!check.success) {
    return next(new HandleERROR(check.message, 400));
  }
  let totalPriceAfterDiscount =
    discount.discountType == "amount"
      ? totalPrice - discount.value
      : totalPrice * (1 - discount.value / 100);
  return res.status(200).json({
    success: true,
    data: {
      discountType: discount.discountType,
      value: discount.value,
      totalPriceAfterDiscount,
    },
    message: `Discount code is valid`,
  });
});
