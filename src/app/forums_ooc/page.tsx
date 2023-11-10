import React from 'react';
import styles from '@/styles/Layout.module.css';
import fill from '@/styles/Fill.module.css';

export default function Page() {
    return (
        <>
            <div className={styles.border}>
                <div className={fill.fill}>
                    OOC Forums
                </div>
            </div>
        </>
    )
}