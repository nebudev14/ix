/* Utility functions for common server-side actions*/
import { getToken } from "next-auth/jwt";
import prisma from "./prisma";

// only to be used in reading, for updating just call prisma manually
export async function getUser(req) {
  const jwt = await getToken({ req });
  if (!jwt) {
    return null;
  }
  const user = await prisma.user.findUnique({
    where: {
      id: jwt.sub,
    },
  });
  if (!user) {
    return null;
  }
  return user;
}

export async function redirect(destination = "/") {
  return {
    redirect: {
      destination,
      permanent: false,
    },
  };
}
