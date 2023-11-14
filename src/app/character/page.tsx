"use client"

import React, { useState, useEffect } from 'react';
import style from '@/styles/Layout.module.css';
import fill from '@/styles/Fill.module.css';
import styles from '@/styles/Character.module.css';

import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Page() {

    const { user, isLoaded, isSignedIn } = useUser();

    const [serial, setSerial] = useState<string>("");
    const [sex, setSex] = useState<string>("male");
    const [raceSelect, setRaceSelect] = useState<string>("human");
    const [gameStyle, setGameStyle] = useState<string>("lightcore");

    const serializer = useQuery(api.users.addSerial) as string;
    const storeUser = useMutation(api.users.storeUser);

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            setSerial(serializer);
        }
    }, [serializer, isLoaded, isSignedIn]);

    const storeUserObject = {
        sex: sex,
        serial: serial,
        raceSelect: raceSelect,
        gameStyle: gameStyle
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
                            <div id={styles.unique}>
                                <div><label htmlFor="fullname">Character Name:</label></div>
                                <div id="fullname">{user?.fullName}</div>
                            </div>

                            <div id={styles.unique}>
                                <div><label htmlFor="emailaddress">Registered Email Address:</label></div>
                                <div id="emailaddress">{user?.primaryEmailAddress!.emailAddress}</div>
                            </div>

                            <div id={styles.unique}>
                                <div><label htmlFor="sex">Sex:</label></div>
                                <div>
                                    <select id="sex" onClick={(e) => { setSex((e.target as HTMLSelectElement).value) }}>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        {/* <option value="nb">Non-binary</option> */}
                                    </select>
                                </div>
                            </div>

                            <div id={styles.unique}>
                                <div><label htmlFor="race">Race select:</label></div>
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
                            </div>

                            <div id={styles.unique}>
                                <div><label htmlFor="gameStyle">Game style:</label></div>
                                <div>
                                    <select id="gameStyle" onClick={(e) => { setGameStyle((e.target as HTMLSelectElement).value) }}>
                                        <option value="lightcore">Lightcore</option>
                                        <option value="midcore">Midcore</option>
                                        <option value="hardcore">Hardcore</option>
                                    </select>
                                </div>
                            </div>

                            <div id={styles.unique}>
                                <button onClick={() => { storeUser(storeUserObject) }}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}