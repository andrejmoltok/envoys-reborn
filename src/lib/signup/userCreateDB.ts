"use server";

import { signUpAuthType } from "@/lib/signup/signUpAuthType";
import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";

const bcrypt = require("bcrypt");

export default async function userCreateDB(data: signUpAuthType) {
  const prisma = new PrismaClient();

  await bcrypt.hash(
    data.password,
    8,
    async function (err: string, hash: string) {
      try {
        await prisma.user.create({
          data: {
            id: nanoid(32),
            username: data.username,
            email: data.email,
            emailVerified: false,
            password: hash,
          },
        });
      } catch {
        //TODO send notification with error.message to Admin UI
        console.error(err);
      }
    }
  );

  await prisma.$disconnect();
}
