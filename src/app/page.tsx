import React from 'react';
import styles from '@/styles/Layout.module.css';
import fill from '@/styles/Fill.module.css';

export default function Home() {
    return (
        <>
            {/* <div className={styles.container}>
                <div className={styles.borderHomeAside}>
                    <div className={fill.fill}>
                        Envoys Reborn FRPG
                    </div>
                </div>
                <div className={styles.borderHomeMain}>
                    <div className={fill.fill}>
                        Envoys Reborn FRPG
                    </div>
                </div>
            </div> */}

            <div className={styles.border}>
                <div className={fill.fill}>
                    Envoys Reborn FRPG
                </div>
            </div>
        </>
    )
}