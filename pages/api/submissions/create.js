import prisma from "../../../lib/prisma";
import { filterBodyAndValidate, missingFields, unauthorized, wrongMethod } from "../../../lib/server";

export default async function handler(req, res) {
  if (req.method != "POST") {
    return wrongMethod();
  }

  const jwt = await getToken({ req });
  if (!jwt) {
    return unauthorized();
  }

  // https://stackoverflow.com/questions/61190495/how-to-create-object-from-another-without-undefined-properties
  const fields = ["title", "description", "members", "tracks", "media"];
  const body = filterBodyAndValidate(req.body, fields, ["title", "description", "members"]);
  if (!body) {
    return missingFields();
  }

  const submission = await prisma.submission.create({
    data: {
      ...body,
    },
  })
  .catch((e) => console.log(e))
  return res.status(200).json(submission)
}
