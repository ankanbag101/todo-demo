import { Schema, model, models } from "mongoose";

const todoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    details: {
      type: String,
      trim: true,
      maxlength: 200,
    },
  },
  { timestamps: true }
);

const Todo = models.Todo || new model("Todo", todoSchema);

export default Todo;
