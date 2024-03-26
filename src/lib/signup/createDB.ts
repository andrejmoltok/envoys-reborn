"use server";

import { signUpAuthType } from "@/lib/signup/signUpAuthType";
import { prisma } from "@/lib/prisma/PrismaClient";
import { nanoid } from "nanoid";
import { v2 as cloudinary } from "cloudinary";
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
        path: "/base/default_s3azbf.jpg",
        selected: true,
      },
    });

    cloudinary.api.create_folder(`galleries/${user}`);
  } catch (error) {
    //TODO send notification with error.message to Admin UI
    console.error(error);
  }

  await prisma.$disconnect();
}
