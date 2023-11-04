import type { Metadata } from 'next'
import './globals.css';
import styles from '@/app/Layout.module.css'
import localFont from 'next/font/local';

const medievalSharp = localFont({
  src: './font/MedievalSharp-Regular.ttf',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Wazi FRPG',
  description: 'Medieval style forum-based play-by-post RPG',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={medievalSharp.className}>
          <div className={styles.border}>
            <div className={styles.newland}>
              <div className={styles.blur}>
                <div className={styles.title}>WAZI</div>
                <div className={styles.subtitle}>The New Land</div>
              </div>
            </div>
          </div>
          <div className={styles.border}>
            {children}
          </div>
      </body>
    </html>
  )
}
