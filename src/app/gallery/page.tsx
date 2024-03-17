"use client";

import React, { useContext, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { IKImage } from "imagekitio-react";

import styles from "@/styles/Layout.module.css";
import fill from "@/styles/Fill.module.css";
import { AuthContext } from "@/context/AuthContextProvider/AuthContext";
import GetAvatar from "@/lib/gallery/getAvatar";

export default function Page() {
  const [isAuth] = useContext(AuthContext);
  const [path, setPath] = useState<string>("");

  useEffect(() => {
    async function fetchAvatar() {
      const avatarPath = await GetAvatar();
      setPath(avatarPath as string);
      console.log(avatarPath);
    }

    fetchAvatar();
  }, [isAuth, path]);

  return (
    <>
      {isAuth ? (
        <>
          <div className={styles.border}>
            <div className={fill.fill}>
              {path && path !== "" ? (
                <IKImage
                  path={path}
                  lqip={{ active: true }}
                  width={150}
                  height={270}
                />
              ) : null}
            </div>
          </div>
        </>
      ) : (
        redirect("/")
      )}
    </>
  );
}
