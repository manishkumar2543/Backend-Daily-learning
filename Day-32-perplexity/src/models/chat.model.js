import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    lastMessageAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

chatSchema.index({ user: 1, updatedAt: -1 });

const chatModel = mongoose.models.Chat || mongoose.model("Chat", chatSchema);

export default chatModel;
