"use client"

import React from 'react';
import Pole from '@/components/Pole';
import styles from '@/styles/Layout.module.css';
import fill from '@/styles/Fill.module.css';
import { useConvexAuth } from 'convex/react';

export default function IC() {

    const { isAuthenticated } = useConvexAuth();

    return (
        <>
            {(isAuthenticated) &&
                <>
                    <div className={styles.border}>
                        <div className={fill.fill}>
                            Profile & Buttons
                        </div>
                    </div>

                    <Pole />
                </>
            }

            <div className={styles.border}>
                <div className={fill.fill}>
                    IC Forums
                </div>
            </div>
        </>
    )
}