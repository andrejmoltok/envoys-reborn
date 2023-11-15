"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import style from '@/styles/Layout.module.css';
import fill from '@/styles/Fill.module.css';
import styles from '@/styles/Character.module.css';

import { useUser } from "@clerk/nextjs";
import { useConvexAuth } from 'convex/react';
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

interface AbilityScore {
    charisma: number;
    constitution: number;
    dexterity: number;
    intelligence: number;
    strength: number;
    wisdom: number;
}

export default function Page() {

    const { user, isLoaded, isSignedIn } = useUser();
    const { isAuthenticated } = useConvexAuth();

    const router = useRouter();

    const [serial, setSerial] = useState<string>("");
    const [sex, setSex] = useState<string>("male");
    const [raceSelect, setRaceSelect] = useState<string>("human");
    const [gameStyle, setGameStyle] = useState<string>("lightcore");
    const [abilityScore, setAbilityScore] = useState<AbilityScore>({
        charisma: 0,
        constitution: 0,
        dexterity: 0,
        intelligence: 0,
        strength: 0,
        wisdom: 0
    });

    const serializer = useQuery(api.users.addSerial) as string;
    const storeUser = useMutation(api.users.storeUser);

    useEffect(() => {
        if (isLoaded && isSignedIn && isAuthenticated) {
            setSerial(serializer);
        }

    }, [serializer, isLoaded, isSignedIn, isAuthenticated]);

    const storeUserObject = {
        sex: sex,
        serial: serial,
        raceSelect: raceSelect,
        gameStyle: gameStyle,
        agreed: true,
        charismaBonus: abilityScore.charisma,
        constitutionBonus: abilityScore.constitution,
        dexterityBonus: abilityScore.dexterity,
        intelligenceBonus: abilityScore.intelligence,
        strengthBonus: abilityScore.strength,
        wisdomBonus: abilityScore.wisdom,
    };

    return (
        <>
            <div className={style.border}>
                <div className={fill.fill}>
                    <div className={styles.setup}>

                        <div className={styles.intro}>
                            <div>
                                This is the setup process for your in-game character.
                                Please read carefully for the hints provided and choose your liking.
                            </div>
                        </div>
                        <div className={styles.fields}>

                            <div className={styles.key}>
                                <div><label htmlFor="fullname">Character Name:</label></div>
                                <div><label htmlFor="emailaddress">Email Address:</label></div>
                                <div><label htmlFor="sex">Sex:</label></div>
                                <div><label htmlFor="race">Race select:</label></div>
                                <div><label htmlFor="gameStyle">Game style:</label></div>
                            </div>

                            <div className={styles.value}>
                                <div id="fullname">{user?.fullName}</div>
                                <div id="emailaddress">{user?.primaryEmailAddress!.emailAddress}</div>
                                <div>
                                    <select id="sex" onClick={(e) => { setSex((e.target as HTMLSelectElement).value) }}>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                <div>
                                    <select id="race" onClick={(e) => { setRaceSelect((e.target as HTMLSelectElement).value) }}>
                                        <option value="human">Human</option>
                                        <option value="elf">Elf</option>
                                        <option value="dwarf">Dwarf</option>
                                        <option value="orc">Orc</option>
                                        <option value="devil">Devil</option>
                                        <option value="gnome">Gnome</option>
                                        <option value="darkelf">Dark Elf</option>
                                    </select>
                                </div>
                                <div>
                                    <select id="gameStyle" onClick={(e) => { setGameStyle((e.target as HTMLSelectElement).value) }}>
                                        <option value="lightcore">Lightcore</option>
                                        <option value="midcore">Midcore</option>
                                        <option value="hardcore">Hardcore</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                        <div id={styles.unique}>
                            <button onClick={() => { storeUser(storeUserObject), router.push("/forums_ic") }}>Save</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}