"use server";

import { prisma } from "@/lib/prisma/PrismaClient";
import { cookies } from "next/headers";
import Iron from "@hapi/iron";
import { UnsealObject } from "@/lib/unsealed";

export default async function setAgreed(): Promise<void> {
  try {
    const cookieStore = cookies();

    const unsealed: UnsealObject = await Iron.unseal(
      cookieStore.get("userSession")?.value as string,
      process.env.IRONPASS as string,
      Iron.defaults
    );

    await prisma.user.update({
      where: {
        id: unsealed?.userID,
      },
      data: {
        agreed: 1,
      },
    });
  } catch (error) {
    console.log(error);
  }
  await prisma.$disconnect();
}
