'use server'

import { signUpAuthType } from "@/lib/signup/signUpAuthType";
import { PrismaClient } from "@prisma/client";

const bcrypt = require('bcrypt');

export default async function userCreateDB(data:signUpAuthType) {

    const prisma = new PrismaClient();

    bcrypt.genSalt(8, async function (err:string, salt:string) {
        bcrypt.hash(data.password, salt, async function (err:string, hash:string) {
            await prisma.user.create({
                data: {
                    username: data.username,
                    email: data.email,
                    password: hash
                }
            });
        });
    });
}