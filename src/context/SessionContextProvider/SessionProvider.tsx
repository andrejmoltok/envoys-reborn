"use client";

import React, { useState } from "react";
import { SessionContext } from "./SessionContext";

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSession, setIsSession] = useState<string>("");

  return (
    <SessionContext.Provider value={[isSession, setIsSession]}>
      {children}
    </SessionContext.Provider>
  );
}
