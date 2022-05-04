import jwt from "jsonwebtoken";
const KEY = "fhdjifhidfijsd";
export default function (req, res) {
  const { token } = req.body;

  const { admin } = jwt.verify(token, KEY);
  if (admin) {
    res.json({ secretAdminCode: 123 });
  } else {
    res.json({ admin: false });
  }
}
