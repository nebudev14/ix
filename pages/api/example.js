export default function handler(req, res) {
  console.log(req.body.name)
  res.status(200).json({ message: "slay" })
}

