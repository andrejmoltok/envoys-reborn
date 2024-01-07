/**
 * @SignUp - signup process function
 * @styles - general styling specific for the signup page
 * @fill & @style - styling specific app-wide
 * 
 * @signUpAuthType - specific for the signup process, contains username, email, password as string
 * @signUpZodSchema - signup process input validation
 * @InputChangeEvent - select between <input> or <select> element change event
 * @auth - Firebase Authentication instance used by react-firebase-hooks
 * @SendEmailverification - sends an email with the email verification code to the registered user
 */

'use client'

import React from 'react';

import useAppCheck from "@/firebase/appcheck";

import styles from '@/styles/Sign.module.css';
import filling from '@/styles/Fill.module.css';
import style from '@/styles/Layout.module.css';

import type { signUpAuthType } from '@/lib/signup/signUpAuthType';
import { signUpZodSchema } from '@/lib/signup/signUpZodSchema';
import { ValidationError } from '@/lib/signup/ZodError';
import { handleZodValidation } from '@/lib/signup/ZodError';
import { FireBaseError } from '@/lib/FirebaseError';

import { InputChangeEvent } from '@/lib/signup/inputChangeEvent';

import { auth } from '@/firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import SendEmailVerification from '@/lib/signup/sendEmailVerification';

const SignUp: React.FC = () => {

    useAppCheck();

    const [signUpData, setSignUpData] = React.useState<signUpAuthType>({
        username: "",
        email: "",
        password: "",
        confirm: ""
    });

    const [errors, setErrors] = React.useState<ValidationError<typeof signUpZodSchema>>({});

    const [userAuth, loadingAuth, errorAuth] = useAuthState(auth);

    const [fireBaseEmailError, setFireBaseEmailError] = React.useState<string>("");
    const [fireBaseUnknownError, setFireBaseUnknownError] = React.useState<string>("");

    function FirebaseAuthErrorFunction(error: FireBaseError) {
        switch (error.code) {
            case ("auth/email-already-in-use"):
                setFireBaseEmailError("A megadott emailcím már regisztrálva van.")
                break;
            default:
                setFireBaseUnknownError('Egyéb hiba: ' + error.message)
        }
    }
    
    const resetSignUpData = ():void => {
        setSignUpData({
            username: "",
            email: "",
            password: "",
            confirm: ""
        })
    };

    const handleInputChange = (e: InputChangeEvent) => {
        const { name, value } = e.target;
        setSignUpData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const onClickSubmit = async (data: signUpAuthType) => {
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                const user = userCredential?.user;
                if (user) {
                    SendEmailVerification(data.username,data.email);
                    resetSignUpData();
                }
            })
            .catch((error) => {
                FirebaseAuthErrorFunction(error);
            });
        
    };

    const schemaParse = (data: signUpAuthType) => {
        handleZodValidation({
            onError: setErrors,
            data: data,
            onSuccess: async () => {
                setErrors({});
                onClickSubmit(data);
                resetSignUpData();
            },
            schema: signUpZodSchema,
        });
    };


    return (
        <div className={style.border}>
            <div className={filling.fill}>
                <div className={styles.signup}>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={signUpData.username}
                            onChange={(e) => handleInputChange(e)}
                            autoComplete='on'
                            placeholder="Gipsz Jakab"
                        />

                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={signUpData.email}
                            onChange={(e) => handleInputChange(e)}
                            autoComplete='on'
                            placeholder="gipszjakab@gmail.com"
                        />

                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={signUpData.password}
                            onChange={(e) => handleInputChange(e)}
                            autoComplete='on'
                            placeholder="********"
                        />

                        <input
                            type="password"
                            id="confirm"
                            name="confirm"
                            value={signUpData.confirm}
                            onChange={(e) => handleInputChange(e)}
                            autoComplete='on'
                            placeholder="********"
                        />
                        
                        <button type="submit" onClick={() => schemaParse(signUpData)}>Regisztrálok</button>

                        <div className={styles.error}>
                            {errors && errors.username && <div style={{ color: "red" }}>Felhasználónév - {errors.username}</div>}
                            {errors && errors.email && <div style={{ color: "red" }}>Email - {errors.email}</div>}
                            {errors && errors.password && <div style={{ color: "red" }}>Jelszó - {errors.password}</div>}
                            {errors && errors.confirm && <div style={{ color: "red" }}>Jelszó ismét - {errors.confirm}</div>}
                            {fireBaseEmailError && <div>{fireBaseEmailError}</div>}
                            {fireBaseUnknownError && <div>{fireBaseUnknownError}</div>}
                        </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;