'use server'

import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";

export default async function DeleteCookieSession(userID:string): Promise<void> {

    const prisma = new PrismaClient();
    const cookieStore = cookies();

    try {

        await prisma.sessionData.delete({
            where: {
                userID: userID
            }
        });

        cookieStore.delete('userSessionID');

    } catch (err) {
        console.error(err);
    }

    await prisma.$disconnect();
}