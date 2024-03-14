"use server";

import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";

export default async function UpdateSession(ID: string): Promise<void> {
  const prisma = new PrismaClient();
  const cookieStore = cookies();

  try {
    const session = await prisma.session.findFirst({
      where: {
        AND: [
          {
            userID: {
              equals: ID,
            },
            status: {
              equals: "active",
            },
          },
        ],
      },
    });

    await prisma.session.update({
      where: {
        id: session?.id,
      },
      data: {
        logoutAt: new Date(),
        status: "loggedOut",
      },
    });

    cookieStore.delete("userSession");
  } catch (err) {
    console.error(err);
  }

  await prisma.$disconnect();
}
