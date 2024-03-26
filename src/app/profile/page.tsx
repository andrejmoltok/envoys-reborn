"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import styles from "@/styles/Layout.module.css";
import fill from "@/styles/Fill.module.css";

import GetProfile from "@/lib/profile/GetProfile";

import { CharacterUnion } from "@/lib/character/CharacterUnion";
import { Player } from "@/lib/character/Player";
import { AbilityScore } from "@/lib/character/AbilityScore";
import { Description } from "@/lib/character/Description";

import { AuthContext } from "@/context/AuthContextProvider/AuthContext";
// import GetSelected from "@/lib/profile/GetSelected";
import AgreedCheck from "@/lib/rules/agreedCheck";

export default function Profile() {
  const [isAuth] = React.useContext(AuthContext);
  const [player, setPlayer] = React.useState<CharacterUnion | null>();
  // const [path, setPath] = React.useState<string | null>();
  const [agreedCheck, setAgreedCheck] = React.useState<boolean | null>();
  const router = useRouter();

  React.useEffect(() => {
    async function fetchProfileData() {
      const profileData = await GetProfile();
      setPlayer(profileData);
    }
    fetchProfileData();
  }, [isAuth]);

  // React.useEffect(() => {
  //   async function fetchAvatarPath() {
  //     const avatarPath = await GetSelected();
  //     setPath(avatarPath);
  //   }

  //   fetchAvatarPath();
  // }, [isAuth]);

  React.useEffect(() => {
    async function fetchAgreed() {
      const agreed = await AgreedCheck();
      setAgreedCheck(agreed);
    }

    fetchAgreed();
  }, [isAuth]);

  return (
    <>
      <div className={styles.border}>
        <div className={fill.fill}>
          {isAuth ? (
            <>
              <div>Firstname {(player as Player)?.firstname}</div>
              <div>Character Strength {(player as AbilityScore)?.strength}</div>
              <div>BackPack Slots {(player as Description)?.backpackSlots}</div>
              <Link href="/gallery">Galéria</Link>
            </>
          ) : (
            <>{router.replace("/rules")}</>
          )}
        </div>
      </div>
    </>
  );
}
