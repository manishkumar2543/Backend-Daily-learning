import mongoose from "mongoose";

const sourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      default: "",
    },
    url: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    _id: false,
  }
);

const messageSchema = new mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "ai"],
      required: true,
    },
    sources: {
      type: [sourceSchema],
      default: [],
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "completed",
    },
  },
  {
    timestamps: true,
  }
);

messageSchema.index({ chat: 1, createdAt: 1 });

const messageModel =
  mongoose.models.Message || mongoose.model("Message", messageSchema);

export default messageModel;
