/**
 * @Action - uses NextJs searchParams to read URL for action mode, usernam and actioncode
 * @redirect - redirects user to the main page when code is already used or invalid/no action mode is defined
 */

import React from 'react';
import { redirect } from 'next/navigation';

import styles from '@/styles/Layout.module.css';
import fill from '@/styles/Fill.module.css';

async function VerifyEmail( username: string, code: string) {
    "use server"
    //TODO check code for validity from Firestore
    //TODO set emailVerified field in Firestore to true
    //TODO display SUCCESS on screen
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