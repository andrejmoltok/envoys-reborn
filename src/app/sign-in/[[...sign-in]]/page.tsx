'use client'

import { SignIn } from "@clerk/nextjs";
import React, { useState, useEffect } from 'react';
import { useSignIn } from "@clerk/nextjs";
import style from '@/styles/Sign.module.css';
import styles from '@/styles/Layout.module.css';
import fill from '@/styles/Fill.module.css';

export default function Page({ }) {

  const { isLoaded } = useSignIn();

  const [isClerkLoaded, setIsClerkLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      setIsClerkLoaded(true);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (isClerkLoaded) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      window.scrollTo({
        top: 470,
        behavior: 'smooth'
      });
    }
  }, [isClerkLoaded]);

  return (
    <>
      <div className={styles.border}>
        <div className={fill.fill}>
          <div className={style.signin}>
            <SignIn path="/sign-in" routing="path" />
          </div>
        </div>
      </div>
    </>
  )
}