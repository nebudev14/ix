import { getToken } from "next-auth/jwt";
import prisma from "../../../lib/prisma";
import { filterBody, wrongMethod, unauthorized, missingFields, filterBodyAndValidate } from "../../../lib/server";

export default async function handler(req, res) {
  if (req.method != "POST") {
    return wrongMethod(res);
  }

  const jwt = await getToken({ req });
  if (!jwt) {
    return unauthorized(res);
  }

  const fields = ["osis", "experience", "year", "discordHandle", "hasTeam", "shouldMatchTeam", "teamMembers"];
  const body = filterBodyAndValidate(req.body, fields, fields);
  if (!body) {
    return missingFields(res);
  }

  const updateUser = await prisma.user.update({
    where: {
      id: jwt.sub,
    },
    data: {
      osis: body.osis,
      experience: body.experience,
      formInfo: {
        create: {
          ...body,
        },
      },
    },
  });
  return res.status(201).json(updateUser);
}
