import user from "../../models/user";
import dbConnect from "./db";

export default async function newUserAnalytics(req, res) {
  await dbConnect();

  let sales = 0;
  try {
    const User = user.find({}, (error, data) => {
      if (error) {
        res.json(error);
      } else {
        if (data.length == 0) {
          res.json({ message: " no user found" });

          return false;
        } else {
          const d = new Date();
          for (var i = 0; i < data.length; i++) {
            if (
              data[i].subscriptionType == "paid" &&
              data[i].createdAt.getDate() == d.getDate() &&
              data[i].createdAt.getMonth() == d.getMonth() &&
              data[i].createdAt.getFullYear() == d.getFullYear()
            ) {
              sales++;
            }
          }
          res.json({ sales: sales });
          return true;
        }
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
}
