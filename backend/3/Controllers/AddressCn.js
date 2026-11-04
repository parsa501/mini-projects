import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Address from "../Models/AddressMd.js";
import User from "../Models/UserMd.js";
export const create = catchAsync(async (req, res, next) => {
  const address = await Address.create({ ...req.body, userId: req.userId });
  await User.findByIdAndUpdate(req.userId, {
    $push: { addressIds: address._id },
  });
  res.status(201).json({
    status: "success",
    data: address,
    message: "Address created successfully",
  });
});
export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Address, req.query, req.role)
    .addManualFilters(req.role == "admin" ? {} : { userId: req.userId })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = await features.execute();
  return res.status(200).json(result);
});
export const getOne = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Address, req.query, req.role)
    .addManualFilters(
      req.role == "admin"
        ? { _id: req.params.id }
        : { userId: req.userId, _id: req.params.id }
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
  const { userId = null, ...updateData } = req.body;
  const searchQuery =
    req.role == "admin" ? { _id: id } : { userId: req.userId, _id: id };
  const address = await Address.findOneAndUpdate(searchQuery, updateData, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({
    status: "success",
    data: address,
    message: "Address updated successfully",
  });
});
export const remove = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const address = await Address.findById(id);
  if (address.userId != req.userId && req.role != "admin") {
    return next(new HandleERROR("You are not authorized to delete this address", 403));
  }
  await address.remove();
  await User.findByIdAndUpdate(req.userId, {
    $pull: { addressIds: id },
  });
  return res.status(200).json({
    status: "success",
    message: "Address deleted successfully",
  });
});
