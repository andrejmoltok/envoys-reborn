import type { Metadata } from 'next'
import './globals.css';
import styles from '@/app/Layout.module.css'
import localFont from 'next/font/local';
import { ClerkProvider } from '@clerk/nextjs'

const medievalSharp = localFont({
  src: './font/MedievalSharp-Regular.ttf',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Wazi - Fantasy forum-based role-playing Game',
  description: 'Forum-based play-by-post fantasy RPG',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
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
    </ClerkProvider>
  )
}
