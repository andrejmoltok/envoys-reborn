"use client";

import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";

import styles from "@/styles/Layout.module.css";
import fill from "@/styles/Fill.module.css";

import GetProfile from "@/lib/profile/GetProfile";

import { CharacterUnion } from "@/lib/character/CharacterUnion";
import { Player } from "@/lib/character/Player";
import { AbilityScore } from "@/lib/character/AbilityScore";
import { Description } from "@/lib/character/Description";

import { AuthContext } from "@/context/AuthContextProvider/AuthContext";

export default function Profile() {
  const [isAuth] = useContext(AuthContext);
  const [player, setPlayer] = useState<CharacterUnion | null>();

  useEffect(() => {
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
          Profile
          {isAuth && (
            <>
              <div>Firstname {(player as Player)?.firstname}</div>
              <div>Character Strength {(player as AbilityScore)?.strength}</div>
              <div>BackPack Slots {(player as Description)?.backpackSlots}</div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
