"use client";

import React from "react";
import { useRouter } from "next/navigation";

import styles from "@/styles/Layout.module.css";
import fill from "@/styles/Fill.module.css";

import { AuthContext } from "@/context/AuthContextProvider/AuthContext";

import setAgreed from "@/lib/rules/setAgreed";
import AgreedCheck from "@/lib/rules/agreedCheck";

function Rulebook() {
  const router = useRouter();

  const [isAuth] = React.useContext(AuthContext);

  const [isChecked, setIsChecked] = React.useState<boolean>(false);

  const [agreedCheck, setAgreedCheck] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      const agreed = await AgreedCheck();
      if (agreed === 1) {
        setAgreedCheck(true);
      } else {
        setAgreedCheck(false);
      }
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      if (isAuth && isChecked) {
        router.push("/character");
      }
    })();
  }, [isChecked, isAuth, router]);

  return (
    <>
      {isAuth && agreedCheck === false && isChecked === false ? (
        <div>
          <input
            type="checkbox"
            id="rules"
            name="rules"
            checked={isChecked}
            onChange={async () => {
              await setAgreed();
              setIsChecked(true);
            }}
          />
          <label htmlFor="rules">Ezennel elfogadom a Játék Szabályzatát!</label>
        </div>
      ) : null}
      {isAuth && agreedCheck && !isChecked ? (
        <div>
          <input type="checkbox" id="rules" name="rules" disabled checked />
          <label htmlFor="rules">Ezennel elfogadom a Játék Szabályzatát!</label>
        </div>
      ) : null}
    </>
  );
}

export default function RenderRules() {
  return (
    <>
      <div className={styles.border}>
        <div className={fill.fill}>
          SZABÁLYZAT
          {<Rulebook />}
        </div>
      </div>
    </>
  );
}
