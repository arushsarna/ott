import user from "../../models/user";
import dbConnect from "./db";

export default async function checkUser(req, res) {
  await dbConnect();
//const { phoneno } = req.body;
  try {
    const User = user.find(req.body, (error, data) => {
      if (error) {
        res.json(error);
      } else {
        if (data.length == 0) {
          res.json(false);
          console.log(false);
          return false;
        } else {
          res.json(true);
          console.log(true);
          return true;
        }
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
}
