"use client";

import React from "react";
import { redirect } from "next/navigation";

import styles from "@/styles/Layout.module.css";
import fill from "@/styles/Fill.module.css";
import gallery from "@/styles/Gallery.module.css";

import { AuthContext } from "@/context/AuthContextProvider/AuthContext";

import GetAvatars from "@/lib/gallery/getAvatars";
import SaveSelected from "@/lib/gallery/saveSelected";

import { SessionContext } from "@/context/SessionContextProvider/SessionContext";
import GetSessionCookie from "@/lib/session/getSessionCookie";

export default function Page() {
  const [isAuth] = React.useContext(AuthContext);
  const [isSession] = React.useContext(SessionContext);
  const [paths, setPaths] = React.useState<
    { id: string; userID: string; path: string; createdAt: Date }[] | undefined
  >();
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);
  const [sessionCookie, setSessionCookie] = React.useState<string>("");

  React.useEffect(() => {
    async function fetchAvatar() {
      const avatarPaths = await GetAvatars();
      setPaths(avatarPaths);
    }

    fetchAvatar();
  }, [isAuth, isSession]);

  React.useEffect(() => {
    async function checkSessionCookie() {
      const session = await GetSessionCookie();
      setSessionCookie(session);
    }
    checkSessionCookie();
  }, []);

  return (
    <>
      {isAuth && sessionCookie === isSession ? (
        <>
          <div className={styles.border}>
            <div className={fill.fill}>
              <div className={gallery.imageGallery}>
                {paths && paths.length > 0
                  ? paths.map((v, i) => (
                      <div key={i} className={gallery.imageWrapper}>
                        {/* className={
                            i === selectedIndex ? gallery.selector : ""
                          }
                          onClick={() => setSelectedIndex(i)} */}
                      </div>
                    ))
                  : null}
              </div>
              <button
                onClick={async () =>
                  paths &&
                  paths?.length > 0 &&
                  (await SaveSelected(paths[selectedIndex].id))
                }
              >
                Mentés
              </button>
            </div>
          </div>
        </>
      ) : (
        redirect("/")
      )}
    </>
  );
}
