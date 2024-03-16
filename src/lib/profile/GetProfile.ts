"use server";

import { prisma } from "@/lib/prisma/PrismaClient";
import { cookies } from "next/headers";
import Iron from "@hapi/iron";
import { UnsealObject } from "@/lib/unsealed";
import { CharacterUnion } from "@/lib/character/CharacterUnion";

export default async function GetProfile(): Promise<CharacterUnion | null> {
  try {
    const cookieStore = cookies();

    const unsealed: UnsealObject = await Iron.unseal(
      cookieStore.get("userSession")?.value as string,
      process.env.IRONPASS as string,
      Iron.defaults
    );

    const player: CharacterUnion | null = await prisma.player.findFirst({
      where: {
        userID: unsealed?.userID,
      },
    });

    return player as CharacterUnion;
  } catch (error) {
    return null;
  }
}
