import type { Metadata } from 'next'
import './globals.css';
import styles from '@/app/Layout.module.css';
import fill from '@/app/Fill.module.css';
import localFont from 'next/font/local';
import { ClerkProvider } from '@clerk/nextjs';
import Nav from '../components/Nav';

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

          <div className={styles.poleContainer}>
            <div className={styles.poles}>
              <div className={styles.pole}></div>
            </div>
            <div className={styles.poles}>
              <div className={styles.pole}></div>
            </div>
            <div className={styles.poles}>
              <div className={styles.pole}></div>
            </div>
            <div className={styles.poles}>
              <div className={styles.pole}></div>
            </div>
          </div>

        <section>
          <div className={styles.border}>
            <div className={fill.fill}>
              <Nav />
            </div>
          </div>
        </section>

          <div className={styles.poleContainer}>
            <div className={styles.poles}>
              <div className={styles.pole}></div>
            </div>
            <div className={styles.poles}>
              <div className={styles.pole}></div>
            </div>
            <div className={styles.poles}>
              <div className={styles.pole}></div>
            </div>
            <div className={styles.poles}>
              <div className={styles.pole}></div>
            </div>
          </div>

        <main>
          <div className={styles.border}>
            {children}
          </div>
        </main>

        
          <div className={styles.poleContainer}>
            <div className={styles.poles}>
              <div className={styles.pole}></div>
            </div>
            <div className={styles.poles}>
              <div className={styles.pole}></div>
            </div>
            <div className={styles.poles}>
              <div className={styles.pole}></div>
            </div>
            <div className={styles.poles}>
              <div className={styles.pole}></div>
            </div>
          </div>

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
