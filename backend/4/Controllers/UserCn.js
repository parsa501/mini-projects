import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import User from "../Models/UserMd.js";
import bcryptjs from "bcryptjs";
export const getOne = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(User, req.query, req.role)
    .addManualFilters({ _id: req.userId })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate({ path: "contactIds", select: "phoneNumber fullName userName" });
  const result = await features.execute();
  return res.status(200).json(result);
});
export const update = catchAsync(async (req, res, next) => {
  const { password = null, ...otherData } = req.body;
  const user = await User.findById(req.userId);
  if (otherData?.username) {
    const existingUser = await User.findOne({ username: otherData.username });
    if (existingUser && existingUser.id !== user.id) {
      return next(new HandleERROR("Username already exists", 400));
    }
  }
  if (!user) return next(new HandleERROR("User not found", 404));
  if (password) {
    user.password = bcryptjs.hashSync(password, 12);
  }
  Object.assign(user, otherData);
  const updatedUser = await user.save();
  return res.status(200).json({
    success: true,
    data: updatedUser,
  });
});

export const remove = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.userId);
  if (!user) return next(new HandleERROR("User not found", 404));
  await user.remove();
  return res.status(204).json({
    success: true,
    data: null,
  });
});