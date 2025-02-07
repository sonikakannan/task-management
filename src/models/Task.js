import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    dueDate: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
    isImportant: { type: Boolean, default: false },
    userId: { type: String, required: true },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);


export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
