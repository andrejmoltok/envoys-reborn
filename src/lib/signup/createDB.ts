"use server";

import { signUpAuthType } from "@/lib/signup/signUpAuthType";
import { prisma } from "@/lib/prisma/PrismaClient";
import { nanoid } from "nanoid";
const bcrypt = require("bcrypt");

export default async function createDB(data: signUpAuthType) {
  const hash = await bcrypt.hash(data.password, 10);
  const user = nanoid(16);

  try {
    await prisma.user.create({
      data: {
        id: user,
        username: data.username,
        email: data.email,
        emailVerified: false,
        passwordHash: hash,
        role: "user",
      },
    });

    await prisma.gallery.create({
      data: {
        id: nanoid(16),
        userID: user,
        path: "/base/default.jpg",
        selected: true,
      },
    });

    // await fetch("https://api.imagekit.io/v1/folder/", {
    //   method: "POST",
    //   headers: {
    //     Authorization: btoa(`${process.env.IK_PRIVATE_KEY}` as string) + ":",
    //   },
    //   body: JSON.stringify({
    //     folderName: `${user}`,
    //     parentFolderPath: "/",
    //   }),
    // });
  } catch (error) {
    //TODO send notification with error.message to Admin UI
    console.error(error);
  }

  await prisma.$disconnect();
}
