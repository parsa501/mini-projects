import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Chat from "../Models/ChatMd.js";
import Message from "../Models/MessageMd.js";
import Media from "../Models/MediaMd.js";
import fs from "fs";
import { __dirname } from "../app.js";
import { getOnlineUsers, io } from "../Socket/index.js";
export const getMessage = catchAsync(async (req, res, next) => {
  const chat = await Chat.findById(req.params.id);
  if (
    chat.type != "channel" &&
    chat.members.find((member) => member.userId.toString() === req.userId)
  ) {
    return next(
      new HandleERROR("You are not allowed to access this chat", 403)
    );
  }
  const features = new ApiFeatures(Message, req.query, req.role)
    .addManualFilters({ chatId: req.params.id })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate([
      { path: "mediaId" },
      { path: "senderId", select: "username profilePic" },
    ]);
  const result = await features.execute();
  if (chat.type != "private") {
    for (const message of result.data) {
      if (message.status !== "seen") {
        message.status = "seen";
        await message.save();
      }
    }
  } else {
    for (const message of result.data) {
      if (message.senderId != req?.userId && message.status != "seen") {
        message.status = "seen";
        await message.save();
      }
    }
  }
  return res.status(200).json(result);
});

export const createMessage = catchAsync(async (req, res, next) => {
  const chat = await Chat.findById(req.body.chatId);
  if (!chat) {
    return next(new HandleERROR("Chat not found", 404));
  }
  if (
    chat.type == "private" &&
    chat.members.find((member) => member.userId.toString() === req.userId)
  ) {
    return next(
      new HandleERROR("You are not allowed to access this chat", 403)
    );
  }
  if (
    chat.type == "group" &&
    !chat.members.find((member) => member.userId.toString() === req.userId)
  ) {
    return next(
      new HandleERROR("You are not allowed to access this chat", 403)
    );
  }
  if (
    chat.type == "channel" &&
    !chat.adminIds.find((userId) => userId.toString() === req.userId) &&
    chat.ownerId.toString() !== req.userId
  ) {
    return next(
      new HandleERROR("You are not allowed to access this chat", 403)
    );
  }
  const message = await Message.create({ ...req.body, senderId: req.userId });
  chat.lastMessage = message._id;
  await chat.save();
  const socketIds = getOnlineUsers(chat.memberIds);
  socketIds.forEach((socketId) => {
    io.to(socketId).emit("newMessage", message);
  });
  return res.status(201).json({ data: message, success: true });
});
export const update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { content = null } = req.body;
  if (!content) {
    return next(new HandleERROR("Content is required", 400));
  }
  const message = await Message.findById(id);
  if (!message || message.senderId.toString() !== req.userId) {
    return next(
      new HandleERROR(
        "Message not found or you are not authorized to update it",
        404
      )
    );
  }
  message.content = content;
 const newMessage= await message.save();
  const chat = await Chat.findById(message.chatId);
  const socketIds = getOnlineUsers(chat.memberIds);
  socketIds.forEach((socketId) => {
    io.to(socketId).emit("updateMessage", newMessage);
  });
  return res.status(200).json({ data: message, success: true });
});

export const remove = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { content = null } = req.body;
  if (!content) {
    return next(new HandleERROR("Content is required", 400));
  }
  const message = await Message.findById(id).populate("chatId");

  if (
    message.chatId.type == "private" &&
    message.senderId.toString() !== req.userId
  ) {
    return next(
      new HandleERROR(
        "Message not found or you are not authorized to update it",
        404
      )
    );
  }
  if (
    message.chatId.type != "private" &&
    !message.chatId.adminIds.find(
      (userId) => userId.toString() === req.userId
    ) &&
    message.senderId.toString() !== req.userId &&
    message.chatId.ownerId.toString() !== req.userId
  ) {
    return next(
      new HandleERROR("You are not authorized to delete this message", 403)
    );
  }

  await message.remove();
  if (message.mediaId) {
    const media = await Media.findByIdAndDelete(message.mediaId);
    const removeDataFilename = media.file.filename;
    if (fs.existsSync(`${__dirname}/Public/${removeDataFilename}`)) {
      fs.unlinkSync(`${__dirname}/Public/${removeDataFilename}`);
    }
  }
   const socketIds = getOnlineUsers(message.chatId.memberIds);
  socketIds.forEach((socketId) => {
    io.to(socketId).emit("removeMessage", message._id);
  });
  return res.status(200).json({ data: message, success: true });
});
