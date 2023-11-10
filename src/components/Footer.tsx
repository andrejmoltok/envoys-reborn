import React from 'react';
import styles from '@/styles/Footer.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <div className={styles.fMain}>
            <div>
                <span>WAZI FRPG</span> 2023 by <Link className={styles.link} rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://github.com/andrejmoltok">Paul Andrei Ciocan</Link> is licensed under <Link href="http://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" className={styles.cc}>CC BY-NC-SA 4.0<Image className={styles.img1} width={35} height={35} src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt="Creative Commons License Image" /><Image className={styles.img1} alt="Creative Commons license image" width={35} height={35} src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" /><Image className={styles.img1} alt="Creative Commons license image" width={35} height={35} src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1" /><Image className={styles.img1} alt="Creative Commons license image" width={35} height={35} src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1" /></Link>
            </div>
        </div>
    )
}