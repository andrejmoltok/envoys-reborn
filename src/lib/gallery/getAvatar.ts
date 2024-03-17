"use server";

import { prisma } from "@/lib/prisma/PrismaClient";
import Iron from "@hapi/iron";
import { cookies } from "next/headers";
import { UnsealObject } from "@/lib/unsealed";
import { AvatarPath } from "./avatarPath";

export default async function GetAvatar(): Promise<string | null> {
  try {
    const cookieStore = cookies();

    const unsealed: UnsealObject = await Iron.unseal(
      cookieStore.get("userSession")?.value as string,
      process.env.IRONPASS as string,
      Iron.defaults
    );

    const avatarPath = await prisma.gallery.findMany({
      where: {
        userID: unsealed?.userID,
      },
      orderBy: [
        {
          createdAt: "asc",
        },
      ],
    });

    return avatarPath[0].path as string;
  } catch (error) {
    return "Path could not be retrieved";
  }
}
