import prisma from "../../../lib/prisma";

export default async (req, res) => {
  if (req.method == "POST") {
    const body = req.body;
    
    let person = await prisma.examplePerson.create({
      data: {
        name: body.name,
        email: body.email
      }
    }).catch((e) => res.status(500).json({ message: "something broke, L" }))

    res.status(200).json(person)

  }
}