import runMiddleware from "../../../middlewares/runMiddleware";
import connectDB from "../../../db/connectDB";
import Todo from "../../../models/Todo";
import Cors from "cors";

connectDB();

const cors = Cors({
  methods: ["GET", "DELETE", "PUT", "HEAD"],
});

const makeObject = (obj) => {
  const keys = Object.keys(obj);
  const tmp = {};
  for (let key of keys) {
    if (obj[key] !== undefined) tmp[key] = obj[key];
  }
  return tmp;
};

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  const { id } = req.query;
  const { method } = req;
  try {
    if (method === "GET") {
      const todo = await Todo.findById(id);
      res.status(200).json({ error: false, data: todo });
    } else if (method === "DELETE") {
      const todo = await Todo.deleteOne({ _id: id });
      if (todo) res.status(200).json({ error: false, data: todo });
    } else if (method === "PUT") {
      const { name, details, done } = req.body;
      const todo = await Todo.findByIdAndUpdate(
        id,
        makeObject({ name, details, done }),
        { new: true }
      );
      res.status(200).json({ error: false, data: todo });
    } else
      res
        .status(400)
        .json({
          error: true,
          reason: { message: "Only GET and DELETE request allowed" },
        });
  } catch (err) {
    res.status(400).json({ error: true, reason: err });
  }
}
