"use server";

import { UnsealObject } from "@/lib/unsealed";
import * as Iron from "@hapi/iron";
import GetSessionCookie from "./getSessionCookie";

export default async function SessionData(): Promise<string> {
  const ironPass = process.env.IRONPASS as string;
  const sessionCookie = await GetSessionCookie();
  try {
    const unsealed: UnsealObject = await Iron.unseal(
      sessionCookie as string,
      ironPass,
      Iron.defaults
    );
    return unsealed?.userID;
  } catch (error) {
    return ""; //TODO implement custom error message+ send notification to adminUI
  }
}
