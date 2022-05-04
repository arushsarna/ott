export default async function (req, res) {
  const { cookies } = req;

  const jwt = cookies.JWT;

  if (!jwt) {
    return res.json({ data: false });
  }

  return res.json({ data: true });
}
