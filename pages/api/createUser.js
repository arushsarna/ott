import user from "../../models/user";
import dbConnect from "./db";

export default async function createUser(req, res) {
  await dbConnect();
  try {
    const newuser = await user.create(req.body);
  } catch (err) {
    res.status(500).json(err);
  }
  console.log(newuser);
  res.json(newuser);
}
