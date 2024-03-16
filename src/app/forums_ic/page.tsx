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
      {isAuth && (
        <>
          <div className={styles.border}>
            <div className={fill.fill}>
              <textarea cols={50} rows={10}></textarea>
            </div>
          </div>
          <Pole />
        </>
      )}

      <div className={styles.border}>
        <div className={fill.fill}>
          <div>Helyszinfa</div>
        </div>
      </div>

      <Pole />

      <div className={styles.border}>
        <div className={fill.fill}>
          <div>Reagok</div>
        </div>
      </div>
    </>
  );
}
