import runMiddleware from "../../middlewares/runMiddleware";
import connectDB from "../../db/connectDB";
import Todo from "../../models/Todo";
import Cors from "cors";

connectDB();

const cors = Cors({
  methods: ["GET", "HEAD"],
});

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  try {
    if (req.method === "GET") {
      const todos = await Todo.find();
      res.status(200).json({ error: false, data: todos });
    } else
      res
        .status(400)
        .json({ error: true, reason: "only GET request is allowed" });
  } catch (err) {
    res.status(400).json({ error: true, reason: err });
  }
}
