/**
 * @Action - uses NextJs searchParams to read URL for action mode, usernam and actioncode
 * @redirect - redirects user to the main page when code is already used or invalid/no action mode is defined
 */

import React from 'react';
import { redirect } from 'next/navigation';
import { db } from '@/firebase/config';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';

import styles from '@/styles/Layout.module.css';
import fill from '@/styles/Fill.module.css';

async function VerifyEmail( username: string, code: string) {
    "use server"
    //TODO check code for validity from Firestore
    //TODO set emailVerified field in Firestore to true
    //TODO display SUCCESS on screen

    const actionCode = doc(db, 'emailVerify', username);
    const actionCodeSnap = await getDoc(actionCode);
    const actionCodeData = actionCodeSnap.data();

    const emailVerified = doc(db, 'users', username);
    const emailVerifiedSnap = await getDoc(emailVerified);
    const emailVerifiedData = emailVerifiedSnap.data();

    if (actionCodeData?.valid) {
        if (actionCodeData?.code === code) {
            setDoc(actionCode, { used: true }, { merge: true });
            setDoc(emailVerified, { emailVerified: true}, { merge: true });
            return (
                <>
                <div className={styles.border}>
                    <div className={fill.fill}>
                        Code used & Email verified
                    </div>
                </div>
                </>  
            )
        } 
    } else {
        return (
            <><div className={styles.border}>
                <div className={fill.fill}>
                    Invalid code, expired or already used
                </div>
                </div>
            </>
        )
    }
}

function ResetPassword(username: string, code: string) {
    //TODO check code for validity from firestore
    //TODO reset password and allow user to set new password
    //TODO display SUCCESS on screen
}

const Action = ({ searchParams }: { searchParams: { mode: string; user: string; actionCode: string; } }) => {
    
    switch (searchParams.mode) {
        case ("verifyEmail"):
            return VerifyEmail(searchParams.user, searchParams.actionCode);
        case ("passwordReset"):
            return ResetPassword(searchParams.user,searchParams.actionCode);
        default: {
            return (
                redirect('/')
            )
        }
    }
}

export default Action;