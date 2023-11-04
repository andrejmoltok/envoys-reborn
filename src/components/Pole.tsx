import styles from '@/components/Pole.module.css';
import React from 'react';

export default function Pole() {
    return (
        <>
            <div className={styles.poleContainer}>
                <div className={styles.poles}>
                    <div className={styles.pole}></div>
                </div>
                <div className={styles.poles}>
                    <div className={styles.pole}></div>
                </div>
                <div className={styles.poles}>
                    <div className={styles.pole}></div>
                </div>
                <div className={styles.poles}>
                    <div className={styles.pole}></div>
                </div>
            </div>
        </>
    )
}