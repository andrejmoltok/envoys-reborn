'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { UserButton, useAuth } from '@clerk/nextjs';
import styles from '@/styles/Nav.module.css';

export default function Nav() {

  const { isSignedIn, isLoaded } = useAuth();

  return (
    <div className={styles.navbar}>
      <div className={styles.navitem}>
        <Link className={styles.link} href="/">Home</Link>
      </div>
      <div className={styles.navitem}>
        <Link className={styles.link} href="/rulebook">Rulebook</Link>
      </div>
      <div className={styles.navitem}>
        <Link className={styles.link} href="/forums_ic">IC Forums</Link>
      </div>
      <div className={styles.navitem}>
        <Link className={styles.link} href="/forums_ooc">OOC Forums</Link>
      </div>
      {(isLoaded && isSignedIn) && <div className={styles.userbutton}> <UserButton afterSignOutUrl='/' /> </div>}
      {!isSignedIn && <>
        <div className={styles.navitem}>
          <Link className={styles.link} href="/sign-in">Sign In</Link>
        </div>
        <div className={styles.navitem}>
          <Link className={styles.link} href="/sign-up">Sign Up</Link>
        </div>
      </>}
    </div>
  )
}