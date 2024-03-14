"use server";

import { prisma } from "@/lib/prisma/PrismaClient";
import { nanoid } from "nanoid";
import Iron from "@hapi/iron";
import { cookies } from "next/headers";
import { AbilityScore } from "./AbilityScore";
import { Player } from "./Player";
import { UnsealObject } from "../unsealed";

export default async function SavePlayer({
  player,
  abilityScore,
}: {
  player: Player;
  abilityScore: AbilityScore;
}) {
  const cookieStore = cookies();

  const unsealed: UnsealObject = await Iron.unseal(
    cookieStore.get("userSession")?.value as string,
    process.env.IRONPASS as string,
    Iron.defaults
  );

  const newSerial = await prisma.player.findMany({
    select: {
      serial: true,
    },
  });

  await prisma.player.create({
    data: {
      id: nanoid(16),
      userID: unsealed?.userID,
      firstname: player.firstname,
      lastname: player.lastname,
      sex: player.sex,
      race: player.race,
      rank: player.rank,
      serial: "#" + (newSerial.length + 1),
      gameStyle: player.gameStyle,
      money: 100,
      level: 1,
      strength: abilityScore.strength,
      dexterity: abilityScore.dexterity,
      constitution: abilityScore.constitution,
      intelligence: abilityScore.intelligence,
      wisdom: abilityScore.wisdom,
      charisma: abilityScore.charisma,
    },
  });

  await prisma.$disconnect();
}
