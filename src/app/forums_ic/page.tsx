import React from 'react';
import Pole from '@/components/Pole';
import styles from '@/styles/Layout.module.css';
import fill from '@/styles/Fill.module.css';

export default function IC() {
    return (
        <>
            <div className={styles.border}>
                <div className={fill.fill}>
                    Profile & Buttons
                </div>
            </div>

            <Pole />

            <div className={styles.border}>
                <div className={fill.fill}>
                    IC Forums
                </div>
            </div>
        </>
    )
}