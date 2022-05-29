import user from "../../models/user";
import dbConnect from "./db";

export default async function setSubscriptionPaid(req, res) {
  await dbConnect();
  const { phoneno } = req.body;
  try {
    const result = user.updateOne(
      { phoneno: phoneno },
      { $set: { subscriptionType: "paid" } },
      (data, err) => {
        if (err) {
          res.json(err);
        } else {
          res.json(data);
        }
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
}
