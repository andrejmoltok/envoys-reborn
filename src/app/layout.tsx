/**
 * @Metadata - used to replace the <head> tag used in pages router
 * @globals @styles @fill - used to style the whole application
 * @localFont - used to add an app-wide font
 * @Nav @Pole @Footer - components used to render the app-wide layout
 */

import type { Metadata } from "next";

import React from "react";

import "./globals.css";
import styles from "@/styles/Layout.module.css";
import fill from "@/styles/Fill.module.css";

import localFont from "next/font/local";

import Nav from "@/components/Nav";
import Pole from "@/components/Pole";
import Footer from "@/components/Footer";

import AuthProvider from "@/context/AuthContextProvider/AuthProvider";
import SessionProvider from "@/context/SessionContextProvider/SessionProvider";
import WarrantClientProvider from "./WarrantClientProvider";

export const metadata: Metadata = {
  title: "Küldöttek: Újjászületés",
  description: "Középkori stílusú mágikus fantázia szerepjáték",
  icons: {
    icon: "/newland.jpg",
  },
};

const medievalSharp = localFont({
  src: "./font/MedievalSharp-Regular.ttf",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <React.StrictMode>
      <SessionProvider>
        <AuthProvider>
          <WarrantClientProvider>
            <html lang="en">
              <body className={medievalSharp.className}>
                <header>
                  <div className={styles.border}>
                    <div className={styles.newland}>
                      <div className={styles.blur}>
                        <div className={styles.title}>Küldöttek</div>
                        <div className={styles.subtitle}>Újjászületés</div>
                      </div>
                    </div>
                  </div>
                </header>

                <Pole />

                <nav>
                  <div className={styles.border}>
                    <div className={fill.fill}>
                      <Nav />
                    </div>
                  </div>
                </nav>

                <Pole />

                <main>{children}</main>

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
          </WarrantClientProvider>
        </AuthProvider>
      </SessionProvider>
    </React.StrictMode>
  );
}
