"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import style from "@/styles/Layout.module.css";
import fill from "@/styles/Fill.module.css";
import styles from "@/styles/Character.module.css";

interface AbilityScore {
  charisma: number;
  constitution: number;
  dexterity: number;
  intelligence: number;
  strength: number;
  wisdom: number;
}

export default function Page() {
  const router = useRouter();

  const [serial, setSerial] = useState<string>("#1");
  const [sex, setSex] = useState<string>("male");
  const [raceSelect, setRaceSelect] = useState<string>("human");
  const [gameStyle, setGameStyle] = useState<string>("lightcore");
  const [abilityScore, setAbilityScore] = useState<AbilityScore>({
    charisma: 1,
    constitution: 1,
    dexterity: 1,
    intelligence: 1,
    strength: 1,
    wisdom: 1,
  });

  const setAbilityScoresByRace = (race: string) => {
    switch (race) {
      case "human":
        return setAbilityScore({
          charisma: 1,
          intelligence: 1,
          wisdom: 1,
          constitution: 1,
          strength: 1,
          dexterity: 1,
        });
      case "elf":
        return setAbilityScore({
          charisma: 0,
          intelligence: 0,
          wisdom: 1,
          constitution: 0,
          strength: 0,
          dexterity: 2,
        });
      case "dwarf":
        return setAbilityScore({
          charisma: 0,
          intelligence: 0,
          wisdom: 0,
          constitution: 2,
          strength: 2,
          dexterity: 0,
        });
      case "orc":
        return setAbilityScore({
          charisma: 0,
          intelligence: 0,
          wisdom: 0,
          constitution: 1,
          strength: 2,
          dexterity: 0,
        });
      case "giant":
        return setAbilityScore({
          charisma: 0,
          intelligence: 0,
          wisdom: 0,
          constitution: 3,
          strength: 2,
          dexterity: 0,
        });
      case "devil":
        return setAbilityScore({
          charisma: 2,
          intelligence: 1,
          wisdom: 0,
          constitution: 0,
          strength: 0,
          dexterity: 0,
        });
      case "gnome":
        return setAbilityScore({
          charisma: 0,
          intelligence: 2,
          wisdom: 0,
          constitution: 0,
          strength: 0,
          dexterity: 1,
        });
      case "darkelf":
        return setAbilityScore({
          charisma: 1,
          intelligence: 0,
          wisdom: 0,
          constitution: 0,
          strength: 0,
          dexterity: 2,
        });
      default:
        return setAbilityScore({
          charisma: 1,
          intelligence: 1,
          wisdom: 1,
          constitution: 1,
          strength: 1,
          dexterity: 1,
        });
    }
  };

  return (
    <>
      {
        <div className={style.border}>
          <div className={fill.fill}>
            <div className={styles.setup}>
              <div className={styles.intro}>
                <div>
                  This is the setup process for your in-game character. Please
                  read carefully for the hints provided and choose your liking.
                </div>
              </div>
              <div className={styles.fields}>
                <div className={styles.key}>
                  <div>
                    <label htmlFor="fullname">Character Name:</label>
                  </div>
                  <div>
                    <label htmlFor="emailaddress">Email Address:</label>
                  </div>
                  <div>
                    <label htmlFor="sex">Sex:</label>
                  </div>
                  <div>
                    <label htmlFor="race">Race select:</label>
                  </div>
                  <div>
                    <label htmlFor="charisma">Charisma:</label>
                  </div>
                  <div>
                    <label htmlFor="constitution">Constitution:</label>
                  </div>
                  <div>
                    <label htmlFor="dexterity">Dexterity:</label>
                  </div>
                  <div>
                    <label htmlFor="intelligence">Intelligence:</label>
                  </div>
                  <div>
                    <label htmlFor="strength">Strength:</label>
                  </div>
                  <div>
                    <label htmlFor="wisdom">Wisdom:</label>
                  </div>
                  <div>
                    <label htmlFor="gameStyle">Game style:</label>
                  </div>
                </div>

                <div className={styles.value}>
                  <div id="fullname">characterName</div>
                  <div id="emailaddress">emailaddress</div>
                  <div>
                    <select
                      id="sex"
                      onClick={(e) => {
                        setSex((e.target as HTMLSelectElement).value);
                      }}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div>
                    <select
                      id="race"
                      onClick={(e) => {
                        setRaceSelect((e.target as HTMLSelectElement).value),
                          setAbilityScoresByRace(
                            (e.target as HTMLSelectElement).value
                          );
                      }}
                    >
                      <option value="human">Human</option>
                      <option value="elf">Elf</option>
                      <option value="dwarf">Dwarf</option>
                      <option value="orc">Orc</option>
                      <option value="giant">Giant</option>
                      <option value="devil">Devil</option>
                      <option value="gnome">Gnome</option>
                      <option value="darkelf">Dark Elf</option>
                    </select>
                  </div>
                  <div>
                    <div id="charisma">
                      {abilityScore.charisma === 0 ? "" : "+"}
                      {abilityScore.charisma}
                    </div>
                    <div id="constitution">
                      {abilityScore.constitution === 0 ? "" : "+"}
                      {abilityScore.constitution}
                    </div>
                    <div id="dexterity">
                      {abilityScore.dexterity === 0 ? "" : "+"}
                      {abilityScore.dexterity}
                    </div>
                    <div id="intelligence">
                      {abilityScore.intelligence === 0 ? "" : "+"}
                      {abilityScore.intelligence}
                    </div>
                    <div id="strength">
                      {abilityScore.strength === 0 ? "" : "+"}
                      {abilityScore.strength}
                    </div>
                    <div id="wisdom">
                      {abilityScore.wisdom === 0 ? "" : "+"}
                      {abilityScore.wisdom}
                    </div>
                  </div>
                  <div>
                    <select
                      id="gameStyle"
                      onClick={(e) => {
                        setGameStyle((e.target as HTMLSelectElement).value);
                      }}
                    >
                      <option value="lightcore">Lightcore</option>
                      <option value="midcore">Midcore</option>
                      <option value="hardcore">Hardcore</option>
                    </select>
                  </div>
                </div>
              </div>
              <div id={styles.unique}>
                <button
                  onClick={() => {
                    router.push("/forums_ic");
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}
