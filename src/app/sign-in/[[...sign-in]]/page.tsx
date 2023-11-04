import { SignIn } from "@clerk/nextjs";
import React from 'react';
import styles from '@/app/Sign.module.css';
 
export default function Page() {
  return (
    <div className={styles.signin}>
      <SignIn />
    </div>
  )
}