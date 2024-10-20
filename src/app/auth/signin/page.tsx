"use client";

import React, { ChangeEvent, useContext } from "react";
import { useRouter, redirect } from "next/navigation";

import styles from "@/styles/Sign.module.css";
import filling from "@/styles/Fill.module.css";
import style from "@/styles/Layout.module.css";

import type { loginAuthType } from "@/lib/signin/loginAuthType";
import { loginZodSchema } from "@/lib/signin/loginZodSchema";
import { ValidationError } from "@/lib/ZodError";
import { handleZodValidation } from "@/lib/ZodError";

import userLoginDB from "@/lib/signin/userLoginDB";
import GetUserID from "@/lib/signin/getUserID";
import GetCookie from "@/lib/signin/getCookie";
import { AuthContext } from "@/context/AuthContextProvider/AuthContext";
import { SessionContext } from "@/context/SessionContextProvider/SessionContext";

const Login: React.FC = () => {
  const [isAuth, setIsAuth] = useContext(AuthContext);
  const [isSession, setIsSession] = useContext(SessionContext);
  const router = useRouter();

  const [loginData, setLoginData] = React.useState<loginAuthType>({
    username: "",
    password: "",
    confirm: "",
  });

  const [errors, setErrors] = React.useState<
    ValidationError<typeof loginZodSchema>
  >({});

  const resetLoginData = (): void => {
    setLoginData({
      username: "",
      password: "",
      confirm: "",
    });
  };

  const resetPass = (): void => {
    setLoginData({
      username: loginData.username,
      password: "",
      confirm: "",
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onClickSubmit = async (data: loginAuthType) => {
    const loginSuccess = await userLoginDB(data);

    if (loginSuccess.success === false) {
      resetPass();
    } else {
      const userID = await GetUserID(data);
      const sessionData = await GetCookie();
      setIsSession(sessionData);
      setIsAuth(true);
      resetLoginData();
      router.replace("/forums_ic");
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
              autoComplete="on"
              placeholder="Felhasználónév"
              required
            />

            <input
              type="password"
              id="password"
              name="password"
              value={loginData.password}
              onChange={(e) => handleInputChange(e)}
              autoComplete="on"
              placeholder="Jelszó"
              required
            />

            <input
              type="password"
              id="confirm"
              name="confirm"
              value={loginData.confirm}
              onChange={(e) => handleInputChange(e)}
              autoComplete="on"
              placeholder="Jelszó Ismét"
              required
            />

            <button type="submit" onClick={() => schemaParse(loginData)}>
              Bejelentkezek
            </button>

            <div className={styles.error}>
              {errors && errors.username && (
                <div style={{ color: "red" }}>
                  Felhasználónév - {errors.username}
                </div>
              )}
              {errors && errors.password && (
                <div style={{ color: "red" }}>Jelszó - {errors.password}</div>
              )}
              {errors && errors.confirm && (
                <div style={{ color: "red" }}>
                  Jelszó ismét - {errors.confirm}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
