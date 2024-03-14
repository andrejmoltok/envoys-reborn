"use server";

import { prisma } from "@/lib/prisma/PrismaClient";
import { loginAuthType } from "./loginAuthType";

export default async function GetUserID(data: loginAuthType): Promise<string> {
  const findUser = await prisma.user.findUnique({
    where: {
      username: data.username,
    },
  });

  await prisma.$disconnect();

  return findUser?.id as string;
}
