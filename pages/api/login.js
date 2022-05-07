// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import jwt from "jsonwebtoken";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import createUser from "./createUser";
import checkUser from "./checkUser";
const KEY = "fhdjifhidfijsd";
import user from "../../models/user";
import dbConnect from "./db";
export default async function handler(req, res) {
  if (!req.body) {
    res.statusCode = 404;
    res.end("Error");
    return;
  }

  const { phoneno } = req.body;
  let userExists = true;
  await dbConnect();
  user.find({ phoneno }, (error, data) => {
    if (error) {
      res.json(error);
    } else {
      if (data.length == 0) {
        user.create({ phoneno });
      }
    }
  });
  // if (!userExists) {
  //   await user.create({ phoneno });
  // }
  const token = sign(
    {
      phoneno,

      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
    },
    KEY
  );

  console.log(token);
  const serialised = serialize("JWT", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
  res.setHeader("Set-Cookie", serialised);
  res.status(200).json({ message: "Success" });
}

// console.log(isUser);

//console.log(req.body.username);
// console.log(req.body);
