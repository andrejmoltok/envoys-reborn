"use client";

import React from "react";
import Pole from "@/components/Pole";
import styles from "@/styles/Layout.module.css";
import fill from "@/styles/Fill.module.css";
import useAuthStore from "@/lib/zustand/useAuthStore";

export default function IC() {
  const { isAuthenticated, userID, sessionData } = useAuthStore();

  return (
    <>
      <div className={styles.border}>
        <div className={fill.fill}>
          IC Forums
          <div>Logged IN --- {isAuthenticated.toString()}</div>
          <div>userID --- {userID}</div>
          <div>sessionData --- {sessionData}</div>
        </div>
      </div>
    </>
  );
}
