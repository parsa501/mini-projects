import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Chat from "../Models/ChatMd.js";
import Message from "../Models/MessageMd.js";
import Media from "../Models/MediaMd.js";
import fs from "fs";
import { __dirname } from "../app.js";
import { getOnlineUsers, io } from "../Socket/index.js";
export const create = catchAsync(async (req, res, next) => {
  const userId = req.userId;
  const { name = "", type = "", pic = "", description = "" } = req.body;
  if (!type || !name || type === "private") {
    return next(
      new HandleERROR("type and name are required or type is private", 400)
    );
  }
  const chat = await Chat.create({
    name,
    type,
    pic,
    description,
    memberIds: [userId],
    adminIds: [userId],
    ownerId: userId,
  });

  return res
    .status(201)
    .json({ data: chat, success: true, message: "Chat created successfully" });
});
export const getAll = catchAsync(async (req, res, next) => {
  const userId = req.userId;
  const features = new ApiFeatures(Chat, req.query, req?.role)
    .addManualFilters({ memberIds: userId })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate({
      path: "lastMessage",
      populate: { path: "senderId", select: "username profilePic" },
    });

  const result = await features.execute();
  return res.status(200).json(result);
});

export const getOne = catchAsync(async (req, res, next) => {
  const userId = req.userId;
  const chat = await Chat.findById(req.params.id).populate([
    { path: "memberIds", select: "username profilePic" },
  ]);
  if (
    !chat ||
    (chat.type === "private" &&
      !chat.memberIds.find((id) => id.toString() === userId))
  ) {
    return next(new HandleERROR("Chat not found", 404));
  }
  return res.status(200).json({
    data: chat,
    success: true,
    message: "Chat retrieved successfully",
  });
});

export const remove = catchAsync(async (req, res, next) => {
  const userId = req.userId;
  const chat = await Chat.findById(req.params.id);
  if (
    chat.type !== "private" &&
    chat.ownerId.toString() !== userId &&
    !chat.memberIds?.find((id) => id.toString() == userId)
  ) {
    return next(
      new HandleERROR("You are not authorized to delete this chat", 403)
    );
  }
  if (chat?.type === "private") {
    await chat.remove();
    const messages = await Message.deleteMany({ chatId: req.params.id });
    for (let message of messages) {
      if (message.mediaId) {
        const media = await Media.findByIdAndDelete(message.mediaId);
        if (fs.existsSync(`${__dirname}/Public/${media.file.filename}`)) {
          fs.unlinkSync(`${__dirname}/Public/${media.file.filename}`);
        }
      }
    }
  }
  if (chat.ownerId != userId) {
    chat.memberIds = chat.memberIds.filter((id) => id.toString() !== userId);
    chat.adminIds = chat.adminIds.filter((id) => id.toString() !== userId);
    await chat.save();
  }
  await chat.remove();
  const messages = await Message.deleteMany({ chatId: req.params.id });
  for (let message of messages) {
    if (message.mediaId) {
      const media = await Media.findByIdAndDelete(message.mediaId);
      if (fs.existsSync(`${__dirname}/Public/${media.file.filename}`)) {
        fs.unlinkSync(`${__dirname}/Public/${media.file.filename}`);
      }
    }
  }

  return res.status(200).json({
    success: true,
    message: "Chat deleted successfully",
  });
});

export const update = catchAsync(async (req, res, next) => {
  const userId = req.userId;
  const chat = await Chat.findById(req.params.id);
  if (chat.type === "private") {
    return next(
      new HandleERROR(
        "you can't change name, pic and description on Private chat",
        403
      )
    );
  }
  if (
    chat.ownerId.toString() !== userId &&
    !chat.adminIds.find((id) => id.toString() === userId)
  ) {
    return next(
      new HandleERROR("You are not authorized to update this chat", 403)
    );
  }
  const { name, pic, description } = req.body;
  chat.name = name || chat.name;
  chat.pic = pic || chat.pic;
  chat.description = description || chat.description;
  await chat.save();
  return res.status(200).json({
    data: chat,
    success: true,
    message: "Chat updated successfully",
  });
});
export const addOrRemoveMember = catchAsync(async (req, res, next) => {
  const userId = req.userId;
  const chat = await Chat.findById(req.params.id);
  if (chat.type === "private") {
    return next(
      new HandleERROR("You can't add or remove members in a private chat", 403)
    );
  }
  const { memberId = null, role = null, action = null } = req.body;
  if (!memberId || !role || !action) {
    return next(
      new HandleERROR("Member ID, role, and action are required", 400)
    );
  }
  if (role == "admin" && chat.ownerId.toString() === userId) {
    if (action == "add") {
      if (!chat?.memberIds?.find((id) => id.toString() === memberId)) {
        chat.memberIds.push(memberId);
      }
      if (!chat?.adminIds?.find((id) => id.toString() === memberId)) {
        chat.adminIds.push(memberId);
      }
    } else if (action == "remove") {
      chat.adminIds = chat.adminIds.filter((id) => id.toString() !== memberId);
    }
  } else if (
    role == "member" &&
    (chat.adminIds?.find((id) => id.toString() === userId) ||
      chat.ownerId.toString() === userId)
  ) {
    if (action == "add") {
      if (!chat?.memberIds?.find((id) => id.toString() === memberId)) {
        chat.memberIds.push(memberId);
      }
    } else if (action == "remove") {
      chat.memberIds = chat.memberIds.filter(
        (id) => id.toString() !== memberId
      );
    }
  }
  const socketIds = getOnlineUsers([memberId]);
  if (action == "add") {
    socketIds.forEach((socketId) => {
      io.to(socketId).emit("addMember", chat);
    });
  } else {
    socketIds.forEach((socketId) => {
      io.to(socketId).emit("removeMember", chat._id);
    });
  }

  return res.status(200).json({
    data: chat,
    success: true,
    message: "Chat members updated successfully",
  });
});
