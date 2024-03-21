"use client";

import React from "react";
import { redirect } from "next/navigation";
import { IKImage, IKUpload } from "imagekitio-react";

import styles from "@/styles/Layout.module.css";
import fill from "@/styles/Fill.module.css";
import gallery from "@/styles/Gallery.module.css";

import { AuthContext } from "@/context/AuthContextProvider/AuthContext";

import GetAvatars from "@/lib/gallery/getAvatars";

export default function Page() {
  const [isAuth] = React.useContext(AuthContext);
  const [paths, setPaths] =
    React.useState<
      { id: string; userID: string; path: string; createdAt: Date }[]
    >();
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);

  React.useEffect(() => {
    async function fetchAvatar() {
      const avatarPaths = await GetAvatars();
      setPaths(avatarPaths);
    }

    fetchAvatar();
  }, [isAuth]);

  return (
    <>
      {isAuth ? (
        <>
          <div className={styles.border}>
            <div className={fill.fill}>
              <div className={gallery.imageGallery}>
                {paths && paths.length > 0
                  ? paths.map((v, i) => (
                      <div key={i} className={gallery.imageWrapper}>
                        <IKImage
                          className={
                            i === selectedIndex ? gallery.selector : ""
                          }
                          onClick={() => setSelectedIndex(i)}
                          path={v.path}
                          lqip={{ active: true }}
                          width={150}
                        />
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </div>
        </>
      ) : (
        redirect("/")
      )}
    </>
  );
}
