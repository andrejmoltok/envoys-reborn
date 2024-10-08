'use client'

import React, { ChangeEvent } from 'react';
import { useRouter, redirect } from 'next/navigation';

import styles from '@/styles/Sign.module.css';
import filling from '@/styles/Fill.module.css';
import style from '@/styles/Layout.module.css';

import type { loginAuthType } from '@/lib/signin/loginAuthType';
import { loginZodSchema } from '@/lib/signin/loginZodSchema';
import { ValidationError } from '@/lib/signup/ZodError';
import { handleZodValidation } from '@/lib/signup/ZodError';

import userLoginDB from '@/lib/signin/userLoginDB';
import useAuthStore from '@/lib/zustand/useAuthStore';
import GetUserID from '@/lib/signin/getUserID';
import GetCookie from '@/lib/signin/getCookie';

const Login: React.FC = () => {

    const { isAuthenticated } = useAuthStore();
    const handleLogin = useAuthStore((state) => state.login);

    const router = useRouter();
    
    const [loginData, setLoginData] = React.useState<loginAuthType>({
        username: "",
        password: "",
        confirm: ""
    });

    const [errors, setErrors] = React.useState<ValidationError<typeof loginZodSchema>>({});
    
    const resetLoginData = ():void => {
        setLoginData({
            username: "",
            password: "",
            confirm: ""
        })
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const onClickSubmit = async (data: loginAuthType) => {
        try {
            await userLoginDB(data);
            const userID = await GetUserID(data);
            const sessionData = await GetCookie();
            handleLogin(true, userID, sessionData)
            resetLoginData();
            router.push('/forums_ic');
        } catch (error) {
            //TODO send notification to Admin UI with error.message
            console.error(error);
        }
    };

    const schemaParse = (data: loginAuthType) => {
        handleZodValidation({
            onError: setErrors,
            data: data,
            onSuccess: () => {
                setErrors({});
                onClickSubmit(data);
                resetLoginData();
            },
            schema: loginZodSchema,
        });
    };

    // TODO create Account page/component
    // if (isAuthenticated) {
    //     redirect('/signin')
    // }
    
    return (
        <>
            <main className={style.border}>
            <div className={filling.fill}>
                <div className={styles.signup}>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={loginData.username}
                            onChange={(e) => handleInputChange(e)}
                            autoComplete='on'
                            placeholder="Gipsz Jakab"
                        />

                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={loginData.password}
                            onChange={(e) => handleInputChange(e)}
                            autoComplete='on'
                            placeholder="********"
                        />

                        <input
                            type="password"
                            id="confirm"
                            name="confirm"
                            value={loginData.confirm}
                            onChange={(e) => handleInputChange(e)}
                            autoComplete='on'
                            placeholder="********"
                        />
                        
                        <button type="submit" onClick={() => schemaParse(loginData)}>Bejelentkezek</button>

                        <div className={styles.error}>
                            {errors && errors.username && <div style={{ color: "red" }}>Felhasználónév - {errors.username}</div>}
                            {errors && errors.password && <div style={{ color: "red" }}>Jelszó - {errors.password}</div>}
                            {errors && errors.confirm && <div style={{ color: "red" }}>Jelszó ismét - {errors.confirm}</div>}
                        </div>
                </div>
            </div>
        </main>
        </>
    )
}

export default Login;