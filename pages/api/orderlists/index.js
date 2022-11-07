import dbConnect from "../../../util/mongo";
import Orderlist from "../../../models/Orderlist";

export default async function handler(req, res) {
  const { method } = req;


  dbConnect();

  if (method === "GET") {
    try {
      const list = await Orderlist.find();
      res.status(200).json(list);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    try {
      const list = await Orderlist.create(req.body);
      res.status(201).json(list);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
