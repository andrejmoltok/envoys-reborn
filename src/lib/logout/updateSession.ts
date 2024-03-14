"use server";

import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma/PrismaClient";

export default async function UpdateSession(ID: string): Promise<void> {
  const cookieStore = cookies();

  try {
    const session = await prisma.session.findFirst({
      where: {
        AND: [
          {
            userID: {
              equals: ID, // searches for the first session entry with the given userID
            },
            status: {
              equals: "active", // searches for the first session entry which is `active`, based on userID
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
