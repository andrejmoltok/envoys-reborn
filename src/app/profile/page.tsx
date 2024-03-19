"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "@/styles/Layout.module.css";
import fill from "@/styles/Fill.module.css";

import GetProfile from "@/lib/profile/GetProfile";

import { CharacterUnion } from "@/lib/character/CharacterUnion";
import { Player } from "@/lib/character/Player";
import { AbilityScore } from "@/lib/character/AbilityScore";
import { Description } from "@/lib/character/Description";

import { AuthContext } from "@/context/AuthContextProvider/AuthContext";

export default function Profile() {
  const [isAuth] = React.useContext(AuthContext);
  const [player, setPlayer] = React.useState<CharacterUnion | null>();

  React.useEffect(() => {
    async function fetchPlayerData() {
      const profileData = await GetProfile();
      setPlayer(profileData);
    }

    fetchPlayerData();
  }, []);

  return (
    <>
      <div className={styles.border}>
        <div className={fill.fill}>
          {isAuth && (
            <>
              <div>Firstname {(player as Player)?.firstname}</div>
              <div>Character Strength {(player as AbilityScore)?.strength}</div>
              <div>BackPack Slots {(player as Description)?.backpackSlots}</div>
              <Link href="/gallery">Galéria</Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
