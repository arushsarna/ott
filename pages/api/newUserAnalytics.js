import user from "../../models/user";
import dbConnect from "./db";

export default async function newUserAnalytics(req, res) {
  await dbConnect();

  let newuser = 0;
  try {
    const User = user.find({}, (error, data) => {
      if (error) {
        res.json(error);
      } else {
        if (data.length == 0) {
          res.json({ message: "user not found" });
          console.log("user not found");
          return false;
        } else {
          const d = new Date();
          let day = d.getDate();
          console.log(d.getMonth());
          for (var i = 0; i < data.length; i++) {
            if (
              data[i].createdAt.getDate() == day &&
              data[i].createdAt.getMonth() == d.getMonth() &&
              data[i].createdAt.getFullYear() == d.getFullYear()
            ) {
              newuser++;
            }
          }
          res.json({ newUser: newuser });
          return true;
        }
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
}
