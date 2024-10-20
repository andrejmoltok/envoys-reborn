"use server";

import { prisma } from "@/lib/prisma/PrismaClient";
import { cookies } from "next/headers";
import Iron from "@hapi/iron";
import { UnsealObject } from "@/lib/unsealed";

export default async function AgreedCheck(): Promise<number | undefined> {
  try {
    const cookieStore = cookies();

    const unsealed: UnsealObject = await Iron.unseal(
      cookieStore.get("userSession")?.value as string,
      process.env.IRONPASS as string,
      Iron.defaults
    );

    const agreed = await prisma.user.findUnique({
      where: {
        id: unsealed?.userID,
      },
      select: {
        agreed: true,
      },
    });

    await prisma.$disconnect();

    return agreed?.agreed;
  } catch (error) {
    // console.log(error);
    return 0;
  }
}
