import type { Metadata } from 'next';
import './globals.css';
import React from 'react';

import styles from '@/styles/Layout.module.css';
import fill from '@/styles/Fill.module.css';

import localFont from 'next/font/local';

import Nav from '@/components/Nav';
import Pole from '@/components/Pole';
import Footer from '@/components/Footer';


export const metadata: Metadata = {
  title: "Envoys Reborn - Forum-based role-playing fantasy game",
  description: "Medieval style role-playing fantasy game",
};

const medievalSharp = localFont({
  src: './font/MedievalSharp-Regular.ttf',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <React.StrictMode>
      <html lang="en">
        <body className={medievalSharp.className}>
          <header>
            <div className={styles.border}>
              <div className={styles.newland}>
                <div className={styles.blur}>
                  <div className={styles.title}>Envoys Reborn</div>
                  <div className={styles.subtitle}>The New Land</div>
                </div>
              </div>
            </div>
          </header>

          <Pole />

          <section>
            <div className={styles.border}>
              <div className={fill.fill}>
                <Nav />
              </div>
            </div>
          </section>

          <Pole />

          <main>
            {children}
          </main>

          <Pole />

          <footer>
            <div className={styles.border}>
              <div className={fill.fill}>
                <Footer />
              </div>
            </div>
          </footer>
        </body>
      </html>
    </React.StrictMode>
  )
}
