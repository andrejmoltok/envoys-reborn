"use server";

import type { loginAuthType } from "@/lib/signin/loginAuthType";
import { cookies } from "next/headers";
import { nanoid } from "nanoid";
import { PrismaClient } from "@prisma/client";
const bcrypt = require("bcrypt");

export default async function userLoginDB(
  login: loginAuthType
): Promise<boolean> {
  const cookieStore = cookies();

  const prisma = new PrismaClient();
  const dbPassHash = await prisma.user.findFirst({
    where: {
      username: login.username,
    },
  });
  const matched = await bcrypt.compare(login.password, dbPassHash?.password);

  if (matched) {
    cookieStore.set("userSession", nanoid(32), {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });

    const findUser = await prisma.user.findFirst({
      where: {
        username: login.username,
      },
    });

    await prisma.session.create({
      data: {
        userID: findUser?.id as string,
        sessionData: 
      },
    });
    await prisma.$disconnect();
    return true;
  } else {
    await prisma.$disconnect();
    return false;
  }
}
