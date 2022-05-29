import content from "../../models/content";
import dbConnect from "./db";

export default async function addcontent(req, res) {
  await dbConnect();
  try {
  
    const newcontent = await content.create(req.body);
  } catch(err) {
    res.status(500).json(err);
}
  console.log(newcontent);
  res.json(newcontent);
}
