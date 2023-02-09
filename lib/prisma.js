import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient(); // i hate javscript so much

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}
export default prisma