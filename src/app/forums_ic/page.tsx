import React from 'react';
import styles from '@/styles/Layout.module.css';
import fill from '@/styles/Fill.module.css';

export default function IC() {
    return (
        <>
            <div className={styles.border}>
                <div className={fill.fill}>
                    IC Forums
                </div>
            </div>
        </>
    )
}