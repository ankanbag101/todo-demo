import runMiddleware from "../../../middlewares/runMiddleware";
import connectDB from "../../../db/connectDB";
import Todo from "../../../models/Todo";
import Cors from "cors";

connectDB();

const cors = Cors({
  methods: ["POST", "HEAD"],
});

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  const { method } = req;
  try {
    if (method === "POST") {
      const { name, details } = req.body;
      const todo = await Todo.create({ name, details });
      res.status(200).json({ error: false, data: todo });
    } else
      res
        .status(400)
        .json({ error: true, reason: "Only POST request allowed" });
  } catch (err) {
    res.status(400).json({ error: true, reason: err });
  }
}
