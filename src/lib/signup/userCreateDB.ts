"use server";

import { signUpAuthType } from "@/lib/signup/signUpAuthType";
import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";

const bcrypt = require("bcrypt");

export default async function userCreateDB(data: signUpAuthType) {
  const prisma = new PrismaClient();

  const hash = await bcrypt.hash(data.password, 10);

  try {
    await prisma.user.create({
      data: {
        id: nanoid(16),
        username: data.username,
        email: data.email,
        emailVerified: false,
        passwordHash: hash,
      },
    });
  } catch (error) {
    //TODO send notification with error.message to Admin UI
    console.error(error);
  }

  await prisma.$disconnect();
}
