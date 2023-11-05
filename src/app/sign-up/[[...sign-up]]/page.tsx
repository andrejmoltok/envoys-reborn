'use client'

import { SignUp } from "@clerk/nextjs";
import React, { useState, useEffect } from 'react';
import { useSignUp } from "@clerk/nextjs";
import styles from '@/styles/Sign.module.css';

export default function Page() {

  const { isLoaded } = useSignUp();

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
    <div className={styles.signup}>
      <SignUp appearance={{
        elements: {
          formButtonPrimary: styles.formButtonPrimary,
          button: styles.button,
          card: styles.card,
          signUpstart: styles.signUpstart,
          footerAction: styles.footerAction,
          footerActionLink: styles.footerActionLink
        },
      }} />
    </div>
  )
}