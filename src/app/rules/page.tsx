"use client"

import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';

import styles from '@/styles/Layout.module.css';
import fill from '@/styles/Fill.module.css';

function Rulebook() {

    const router = useRouter();

    const [isChecked, setIsChecked] = useState<boolean>(false);

    const [agreedCheck, setAgreedCheck] = useState<boolean>(false);

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
    };

    const redirectToCharacter = useCallback(() => {
        router.push('/character');
    }, [router])

    useEffect(() => {
        if (isChecked) {
            redirectToCharacter()
        };
    }, [isChecked, redirectToCharacter]);

    return (
        <>

            {(!isChecked) &&
                <div>
                    <input type="checkbox" id="rules" name="rulesCheckbox" checked={isChecked} onChange={handleCheckboxChange} />
                    <label htmlFor="rules">Hereby I agree to the Rules of the Game</label>
                </div>}
            {/* {() &&
                <div>
                    <input type="checkbox" id="rules" name="rulesCheckbox" disabled checked />
                    <label htmlFor="rules">Hereby I agree to the Rules of the Game</label>
                </div>
            } */}

        </>
    )
}

export default function RenderRules() {

    return (
        <>
            <div className={styles.border}>
                <div className={fill.fill}>
                    RULES
                    {<Rulebook />}
                </div>
            </div>
        </>
    )
}