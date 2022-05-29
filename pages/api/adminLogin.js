import jwt from "jsonwebtoken";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
const KEY = "fhdjifhidfijsd";
import admin from "../../models/admin";
import dbConnect from "./db";
export default async function adminLogin(req, res) {
  if (!req.body) {
    res.statusCode = 404;
    res.end("Error");
    return;
  }

  const { username, password } = req.body;

  await dbConnect();
  try {
    const Admin = admin.find({ username }, (error, data) => {
      if (error) {
        res.json(error);
      } else {
        console.log(data.length);
        if (data.length !== 1) {
          console.log(false);
          return res.status(400).json({ data: false });
        }

        if (password == data[0].password) {
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
        } else res.status(400).json({ data: false });
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
}
