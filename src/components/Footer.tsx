import React from "react";
import styles from "@/styles/Footer.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    <div className={styles.fMain}>
      <div>
        A <span>Küldöttek: Újjászületés</span> FRPG{" "}
        <Link
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.hu"
          target="_blank"
          rel="license noopener noreferrer"
          className={styles.cc}
        >
          CC BY-NC-SA 4.0
        </Link>{" "}
        licensz alatt áll.
      </div>
      <div>
        Készítette{" "}
        <Link
          className={styles.link}
          rel="cc:attributionURL dct:creator"
          property="cc:attributionName"
          href="https://github.com/andrejmoltok"
          target="_blank"
        >
          Paul Andrei Ciocan
        </Link>
      </div>
    </div>
  );
}
