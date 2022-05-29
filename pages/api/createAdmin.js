import jwt from "jsonwebtoken";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
const KEY = "fhdjifhidfijsd";
import adminSchema from "../../models/admin";
import dbConnect from "./db";
export default async function createAdmin(req, res) {
  if (!req.body) {
    res.statusCode = 404;
    res.end("Error");
    return;
  }

  const { username, password } = req.body;

  await dbConnect();
  try {
    adminSchema.find({ username: username }, (err, data) => {
      if (err) {
        res.json(err);
      } else {
        console.log(data.length);
        if (data.length != 0) {
          res.status(400).json({ data: false });
        } else {
          adminSchema.create(
            { username: username, password: password },
            (err, data2) => {
              if (err) {
                res.json(err);
              } else {
                const token = sign(
                  {
                    username,

                    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
                  },
                  KEY
                );
                const serialised = serialize("JWT", token, {
                  httpOnly: true,
                  secure: process.env.NODE_ENV !== "development",
                  sameSite: "strict",
                  maxAge: 60 * 60 * 24 * 30,
                  path: "/",
                });
                res.setHeader("Set-Cookie", serialised);
                res.status(200).json({ data: true });
              }
            }
          );
        }
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
}
