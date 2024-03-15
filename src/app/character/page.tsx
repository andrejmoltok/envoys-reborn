"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import style from "@/styles/Layout.module.css";
import fill from "@/styles/Fill.module.css";
import styles from "@/styles/Character.module.css";

import { AbilityScore } from "@/lib/character/AbilityScore";
import { Player } from "@/lib/character/Player";
import SavePlayer from "@/lib/character/SavePlayer";

import { InputChangeEvent } from "@/lib/character/InputChangeEvent";

export default function Page() {
  const router = useRouter();

  const [player, setPlayer] = useState<Player>({
    firstname: "",
    lastname: "",
    sex: "male",
    race: "human",
    rank: "Kezdő Játékos",
    serial: "",
    gameStyle: "lightcore",
  });

  const [abilityScore, setAbilityScore] = useState<AbilityScore>({
    charisma: 1,
    constitution: 1,
    dexterity: 1,
    intelligence: 1,
    strength: 1,
    wisdom: 1,
  });

  const setPlayerData = (event: InputChangeEvent) => {
    const { name, value } = event.target;
    setPlayer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
                    <label htmlFor="fullname">Karakternév:</label>
                  </div>
                  <div>
                    <label htmlFor="sex">Nem:</label>
                  </div>
                  <div>
                    <label htmlFor="race">Faj:</label>
                  </div>
                  <div>
                    <label htmlFor="charisma">Karizma:</label>
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
                    <label htmlFor="gameStyle">Játékstílus:</label>
                  </div>
                </div>

                <div className={styles.value}>
                  <div>
                    <input
                      type="text"
                      id="firstname"
                      name="firstname"
                      value={player.firstname}
                      onChange={(e) => setPlayerData(e)}
                      autoComplete="on"
                      placeholder="keresztnév"
                    />

                    <input
                      type="text"
                      id="lastname"
                      name="lastname"
                      value={player.lastname}
                      onChange={(e) => setPlayerData(e)}
                      autoComplete="on"
                      placeholder="családnév"
                    />
                  </div>

                  <div>
                    <select
                      id="sex"
                      name="sex"
                      onChange={(e) => {
                        setPlayerData(e);
                      }}
                    >
                      <option value="male">Férfi</option>
                      <option value="female">Nő</option>
                    </select>
                  </div>
                  <div>
                    <select
                      id="race"
                      name="race"
                      onChange={(e) => {
                        setPlayerData(e),
                          setAbilityScoresByRace(
                            (e.target as HTMLSelectElement).value
                          );
                      }}
                    >
                      <option value="human">Ember</option>
                      <option value="elf">Elf</option>
                      <option value="dwarf">Törpe</option>
                      <option value="orc">Ork</option>
                      <option value="giant">Óriás</option>
                      <option value="devil">Ördög</option>
                      <option value="gnome">Gnóm</option>
                      <option value="darkelf">Sötételf</option>
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
                      name="gameStyle"
                      onChange={(e) => {
                        setPlayerData(e);
                      }}
                    >
                      <option value="szelíd">Szelíd</option>
                      <option value="bátor">Bátor</option>
                      <option value="vakmerő">Vakmerő</option>
                    </select>
                  </div>
                </div>
              </div>
              <div id={styles.unique}>
                <button
                  onClick={async () => {
                    await SavePlayer({ player, abilityScore });
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
