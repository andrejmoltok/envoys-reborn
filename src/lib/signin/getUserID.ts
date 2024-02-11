"use server";

import { PrismaClient } from "@prisma/client";
import { loginAuthType } from "./loginAuthType";

export default async function GetUserID(data: loginAuthType): Promise<string> {
  const prisma = new PrismaClient();

  const findUser = await prisma.user.findFirst({
    where: {
      username: data.username,
    },
  });

  await prisma.$disconnect();

  return findUser?.id as string;
}
