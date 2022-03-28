import { Schema, model, models } from "mongoose";

const todoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    details: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    done: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Todo = models.Todo || new model("Todo", todoSchema);

export default Todo;
