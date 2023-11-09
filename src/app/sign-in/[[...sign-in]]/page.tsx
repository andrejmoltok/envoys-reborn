'use client'

import { SignIn } from "@clerk/nextjs";
import React, { useState, useEffect } from 'react';
import { useSignIn } from "@clerk/nextjs";
import styles from '@/styles/Sign.module.css';

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
    <div className={styles.signin}>
      <SignIn appearance={{
        elements: {
          formButtonPrimary: styles.formButtonPrimary,
          button: styles.button,
          signInroot: styles.signInroot,
          card: styles.card,
          signInstart: styles.signInstart,
          footerAction: styles.footerAction,
          footerActionLink: styles.footerActionLink
        },
      }} />
    </div>
  )
}