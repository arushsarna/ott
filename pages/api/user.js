import jwtmain from "jsonwebtoken";
const KEY = "fhdjifhidfijsd";
export default async function (req, res) {
  const { cookies } = req;

  const jwt = cookies.JWT;

  if (!jwt) {
    return res.json({ data: false });
  }
  const data = jwtmain.verify(jwt, KEY);

  return res.json({ data: true, phoneno: data.phoneno });
}
