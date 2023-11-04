import type { Metadata } from 'next'
import './globals.css';
import styles from '@/app/Layout.module.css';
import fill from '@/app/Fill.module.css';
import localFont from 'next/font/local';
import { ClerkProvider } from '@clerk/nextjs';
import Nav from '@/components/Nav';
import Pole from '@/components/Pole';

const medievalSharp = localFont({
  src: './font/MedievalSharp-Regular.ttf',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Wazi - Forum-based role-playing fantasy game',
  description: 'Play-by-post fantasy RPG',
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
          <header>
            <div className={styles.border}>
              <div className={styles.newland}>
                <div className={styles.blur}>
                  <div className={styles.title}>WAZI</div>
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
            <div className={styles.border}>
              {children}
            </div>
          </main>


          <Pole />

          <footer>
            <div className={styles.border}>
              <div className={fill.fill}>

              </div>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  )
}
