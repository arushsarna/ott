// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import jwt from "jsonwebtoken";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
const KEY = "fhdjifhidfijsd";
export default function handler(req, res) {
  if (!req.body) {
    res.statusCode = 404;
    res.end("Error");
    return;
  }

  const { phoneno } = req.body;

  //res.status(200).json({ name: "John Doe" });

  const token = sign(
    {
      phoneno,

      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
    },
    KEY
  );
  //console.log(token);
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

//console.log(req.body.username);
// console.log(req.body);
