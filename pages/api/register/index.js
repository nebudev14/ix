import prisma from "../../../lib/prisma";

export default async function register(req, res) {
  if (req.method == "POST") {
    const body = req.body;

    // let person = await prisma.examplePerson.create({
    //   data: {
    //     name: body.name,
    //     email: body.email
    //   }
    // }).catch((e) => res.status(500).json({ message: "something broke, L" }))
    console.log(body);
    let user = await prisma.user
      .create({
        data: {
          name: body.name,
          email: body.email,
          osis: body.osis,
          experience: body.experience,
        },
      })
      .catch((e) => {
        console.log(e);
        return res.status(500).json({ message: "todo: proper error handling" });
      });

    res.status(200).json(user);
  }
}
