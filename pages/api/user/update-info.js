import { getToken } from "next-auth/jwt";
import prisma from "../../../lib/prisma";

// TODO: server side validation of OSIS and image (link)
export default async function handler(req, res) {
    if (req.method != "PUT") {
        console.log(req.method)
        return res.status(405).json({ message: "Method Not Allowed" });
    }
    const jwt = await getToken({ req });
    if (!jwt) {
        return res.status(401).json({ message: "Unauthorized" });
    }


    // https://stackoverflow.com/questions/61190495/how-to-create-object-from-another-without-undefined-properties
    // current changeable fields
    const fields = ["osis", "name", "image", "experience", "initialized"]
    const body = Object.fromEntries(fields
        .filter(field => req.body[field])
        .map(field => [field, req.body[field]])
    );
    if (body.initialized && !body.osis && !body.experience) {
        return res.status(400).json({ message: "Bad Request - Missing required fields" });
    }

    const updateUser = await prisma.user.update({
        where: {
            id: jwt.sub,
        },
        data: {
            ...body
        }
    });
    return res.status(200).json(updateUser);

}