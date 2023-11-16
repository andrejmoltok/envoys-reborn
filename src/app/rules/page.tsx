"use client"

import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';

import styles from '@/styles/Layout.module.css';
import fill from '@/styles/Fill.module.css';

import { useUser } from '@clerk/nextjs';
import { useQuery, useConvexAuth } from 'convex/react';
import { api } from '@/convex/_generated/api';

function Rulebook() {

    const { isSignedIn, isLoaded } = useUser();

    const router = useRouter();

    const [isChecked, setIsChecked] = useState<boolean>(false);

    const [agreedCheck, setAgreedCheck] = useState<boolean>(false);

    const checkAgreed = useQuery(api.users.readUserById);

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
    };

    const redirectToCharacter = useCallback(() => {
        router.push('/character');
    }, [router])

    useEffect(() => {
        if (isLoaded && isSignedIn && isChecked) {
            redirectToCharacter()
        };
    }, [isChecked, isLoaded, isSignedIn, redirectToCharacter]);

    useEffect(() => {
        if (isSignedIn && checkAgreed !== null) {
            setAgreedCheck(checkAgreed?.agreed as boolean)
        }
    }, [checkAgreed, checkAgreed?.agreed, isSignedIn]);

    return (
        <>

            {(isSignedIn && !isChecked && !agreedCheck) &&
                <div>
                    <input type="checkbox" id="rules" name="rulesCheckbox" checked={isChecked} onChange={handleCheckboxChange} />
                    <label htmlFor="rules">Hereby I agree to the Rules of the Game</label>
                </div>}
            {(isSignedIn && agreedCheck) &&
                <div>
                    <input type="checkbox" id="rules" name="rulesCheckbox" disabled checked />
                    <label htmlFor="rules">Hereby I agree to the Rules of the Game</label>
                </div>
            }

        </>
    )
}

export default function RenderRules() {

    const { isAuthenticated } = useConvexAuth();

    return (
        <>
            <div className={styles.border}>
                <div className={fill.fill}>
                    RULES
                    {(isAuthenticated) && <Rulebook />}
                </div>
            </div>
        </>
    )
}