import user from "../../models/user";
import dbConnect from "./db";

export default async function createUser(req, res) {
  await dbConnect();

  const newuser = await user.create(req.body);
  console.log(newuser);
  res.json(newuser);
}
