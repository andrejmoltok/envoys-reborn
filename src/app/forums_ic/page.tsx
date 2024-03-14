"use client";

import React, { useContext } from "react";
import Pole from "@/components/Pole";
import styles from "@/styles/Layout.module.css";
import fill from "@/styles/Fill.module.css";
import { AuthContext } from "@/context/AuthContextProvider/AuthContext";

export default function IC() {
  const [isAuth, setIsAuth] = useContext(AuthContext);

  return (
    <>
      <div className={styles.border}>
        <div className={fill.fill}>
          IC Forums
          <div>Logged IN --- {isAuth.toString()}</div>
          {/* <div>userID --- {userID}</div>
          <div>sessionData --- {sessionData}</div> */}
        </div>
      </div>
    </>
  );
}
