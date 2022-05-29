import jwtmain from "jsonwebtoken";
const KEY = "fhdjifhidfijsd";
import adminSchema from "../../models/admin";
import dbConnect from "./db";
export default async function (req, res) {
  const { cookies } = req;
  const { ver } = req;
  const jwt = cookies.JWT;

  if (!jwt) {
    return res.json({ data: false });
  }
  const verification = jwtmain.verify(jwt, KEY);

  try {
    adminSchema.find({ username: verification.username }, (error, data) => {
      if (error) {
        return res.json(error);
      } else {
        if (data.length == 0) {
          return res.json({ data: false });
        }

        return res.json({ data: true, username: verification.username });
      }
    });
  } catch (err) {
    return res.status(500).json(err);
  }
  return;
}
