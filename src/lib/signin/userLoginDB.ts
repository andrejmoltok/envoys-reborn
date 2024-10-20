"use server";

import type { loginAuthType } from "@/lib/signin/loginAuthType";
import { cookies } from "next/headers";
import { nanoid } from "nanoid";
import { prisma } from "@/lib/prisma/PrismaClient";
import Iron from "@hapi/iron";
import { publicIpv4 } from "public-ip";
const bcrypt = require("bcrypt");

export default async function userLoginDB(
  login: loginAuthType
): Promise<{ success: boolean; error?: string }> {
  try {
    const cookieStore = cookies();
    const userIP = await publicIpv4();
    const randomNano = nanoid(64);

    const findUserByUsername = await prisma.user.findUnique({
      where: {
        username: login.username,
      },
    });

    if (!findUserByUsername) {
      return { success: false, error: "A megadott felhasználónév hibás" };
    }

    const passMatchUser = await bcrypt.compare(
      login.password,
      findUserByUsername.passwordHash
    );

    if (!passMatchUser) {
      return { success: false, error: "A megadott jelszó hibás" };
    }

    const sessionTokenByUser = {
      userID: findUserByUsername.id,
      email: findUserByUsername.email,
      userIP,
      randomNano,
    };

    const sealed = await Iron.seal(
      sessionTokenByUser,
      process.env.IRONPASS as string,
      Iron.defaults
    );

    cookieStore.set("userSession", sealed, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });

    await prisma.session.create({
      data: {
        id: nanoid(16),
        userID: findUserByUsername.id,
        sessionData: sealed,
        loginAt: new Date(),
        status: "active",
      },
    });

    await prisma.$disconnect();
    return { success: true };
  } catch (error) {
    console.error("Error during login:", error);
    await prisma.$disconnect();
    return { success: false, error: "Hiba történt a bejelentkezés során" };
  }
}
