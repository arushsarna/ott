// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import jwt from "jsonwebtoken";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import createUser from "./createUser";
import checkUser from "./checkUser";
const KEY = "fhdjifhidfijsd";
import user from "../../models/user";
import dbConnect from "./db";
import { areArraysEqual } from "@mui/base";
export default async function handler(req, res) {
  if (!req.body) {
    res.statusCode = 404;
    res.end("Error");
    return;
  }

  const { phoneno } = req.body;

  await dbConnect();
  try {
    const User = user.find({ phoneno }, (error, data) => {
      if (error) {
        res.json(error);
      } else {
        if (data.length == 0) {
          const token = sign(
            {
              phoneno,

              exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
            },
            KEY
          );
          var arr = [];
          arr.push(token);
          console.log(data);

          user.create({ phoneno, multilogin: arr }, (err, data2) => {
            if (err) {
              res.json(err);
            } else {
              const serialised = serialize("JWT", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 30,
                path: "/",
              });
              res.setHeader("Set-Cookie", serialised);
              res.status(200).json({ message: "success" });
            }
          });
        } else {
          const token = sign(
            {
              phoneno,

              exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
            },
            KEY
          );
          var arr = [];

          arr = data[0].multilogin;
          if (arr.length == 3) {
            arr.shift();
            arr.push(token);
          } else {
            arr.push(token);
          }

          user.updateOne(
            { phoneno: phoneno },
            { $set: { multilogin: arr } },
            (err, data) => {
              if (err) {
                res.json(err);
              } else {
                const serialised = serialize("JWT", token, {
                  httpOnly: true,
                  secure: process.env.NODE_ENV !== "development",
                  sameSite: "strict",
                  maxAge: 60 * 60 * 24 * 30,
                  path: "/",
                });
                res.setHeader("Set-Cookie", serialised);
                res.status(200).json({ message: "success" });
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
