import jwtmain from "jsonwebtoken";
const KEY = "fhdjifhidfijsd";
import user from "../../models/user";
import dbConnect from "./db";
export default async function (req, res) {
  const { cookies } = req;

  const jwt = cookies.JWT;

  if (!jwt) {
    return res.json({ data: false });
  }
  const verification = jwtmain.verify(jwt, KEY);
  try {
    const User = user.find({ phoneno: verification.phoneno }, (error, data) => {
      if (error) {
        res.json(error);
      } else {
        if (data.length == 0) {
          return res.json({ data: false });
        }

        for (var i = 0; i < data[0].multilogin.length; i++) {
          if (data[0].multilogin[i] == jwt) {
            return res.json({ data: true, phoneno: verification.phoneno });
          }
        }
        res.status(400).json({ data: false });
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
}
