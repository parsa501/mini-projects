import Comment from "../Models/CommentMd.js";
import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
export const create = catchAsync(async (req, res, next) => {
  const comment = await Comment.create({
    ...req.body,
    userId: req.userId,
  });
  return res.status(201).json({
    success: true,
    data: comment,
    message: 'Comment created successfully'
  });
});

export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Comment, req?.query, req?.role)
    .addManualFilters()
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = await features.execute();
  return res.status(200).json(result);
});

export const getAllPostComments = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Comment, req?.query, req?.role)
    .addManualFilters(
      req?.role != "admin"
        ? { $and: [{ isPublish: true }, { postId: req.params.id }] }
        : { postId: req.params.id }
    )
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = await features.execute();
  return res.status(200).json(result);
});
export const changeIsPublish = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const comment = await Comment.findById(id);
  comment.isPublish = !comment.isPublish;
  const newComment = await comment.save();
  return res.status(200).json({
    success: true,
    data: newComment,
    message: `Comment ${newComment.isPublish ? "published" : "unpublished"} successfully`
  });
});
export const remove = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const comment = await Comment.findByIdAndDelete(id);
  if (!comment) {
    return next(new HandleERROR("Comment not found", 404));
  }
  return res.status(200).json({
    success: true,
    data: null,
    message: "Comment deleted successfully"
  });
});