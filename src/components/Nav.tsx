'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { UserButton, useAuth } from '@clerk/nextjs';
import styles from '@/styles/Nav.module.css';
import style from '@/styles/Layout.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faLandmarkDome,
  faScroll,
  faArrowRightToBracket,
  faUserPlus,
  faPersonCirclePlus,
  faPersonCircleMinus
} from '@fortawesome/free-solid-svg-icons';
import { createPortal } from 'react-dom';
// import Profile from '@/components/Profile';

export default function Nav() {

  const { isSignedIn, isLoaded } = useAuth();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const hamburgerMenuIconRef = useRef<HTMLDivElement>(null);
  const hamburgerMenuRef = useRef<HTMLDivElement>(null);

  const [menuHeight, setMenuHeight] = useState<number>(0);
  const [menuTopLeft, setMenuTopLeft] = useState<{ screenX: number, screenY: number }>({ screenX: 0, screenY: 0 });

  useEffect(() => {
    if (isOpen && hamburgerMenuRef.current) {
      const temp = hamburgerMenuRef.current.getBoundingClientRect();
      setMenuHeight(temp.height);
    };
  }, [hamburgerMenuRef, isOpen]);

  useEffect(() => {
    const menuIcon = hamburgerMenuIconRef.current;
    if (!menuIcon) {
      console.log('no menuIconRef')
      return;
    }

    const handleResize = () => {
      const iconRect = menuIcon.getBoundingClientRect();
      const iconleft = iconRect.right - 175;
      const iconright = iconleft;
      const newTop = iconRect.bottom + menuHeight;
      setMenuTopLeft({ screenX: newTop, screenY: iconright });
    }
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setWindowWidth(window.innerWidth);
      }
    };

    window.addEventListener('resize', handleResize);

    if (typeof window !== 'undefined' && windowWidth > 1150) {
      setIsOpen(false);
    };

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowWidth]);

  return (
    <div>
      <div className={styles.navbar}>
        <div className={styles.navitem}>
          <Link className={styles.link} href="/"><FontAwesomeIcon icon={faLandmarkDome} style={{ color: "#252c36", }} /> Home</Link>
        </div>
        <div className={styles.navitem}>
          <Link className={styles.link} href="/rulebook"><FontAwesomeIcon icon={faScroll} style={{ color: "#252c36", }} /> Rulebook</Link>
        </div>
        <div className={styles.navitem}>
          <Link className={styles.link} href="/forums_ic"><FontAwesomeIcon icon={faPersonCirclePlus} style={{ color: "#252c36", }} /> IC</Link>
        </div>
        <div className={styles.navitem}>
          <Link className={styles.link} href="/forums_ooc"><FontAwesomeIcon icon={faPersonCircleMinus} style={{ color: "#252c36", }} /> OOC</Link>
        </div>

        {(isLoaded && isSignedIn) && <div className={styles.userbutton}>
          <UserButton afterSignOutUrl='/' />
        </div>}

        {!isSignedIn && <>
          <div className={styles.navitem}>
            <Link className={styles.link} href="/sign-in"><FontAwesomeIcon icon={faArrowRightToBracket} style={{ color: "#252c36", }} /> Sign In</Link>
          </div>
          <div className={styles.navitem}>
            <Link className={styles.link} href="/sign-up"><FontAwesomeIcon icon={faUserPlus} style={{ color: "#252c36", }} /> Sign Up</Link>
          </div>
        </>}
      </div>

      {document.getElementsByClassName("shrunkMenu1150") && <div className={styles.shrunkMenu1150}>
        <div className={styles.navitem}>
          <Link className={styles.link} href="/" onClick={() => { setIsOpen(false) }}><FontAwesomeIcon icon={faLandmarkDome} style={{ color: "#252c36", }} /> Home</Link>
        </div>
        <div className={styles.navitem}>
          <Link className={styles.link} href="/rulebook" onClick={() => { setIsOpen(false) }}><FontAwesomeIcon icon={faScroll} style={{ color: "#252c36", }} /> Rulebook</Link>
        </div>
        <div className={styles.navitem} ref={hamburgerMenuIconRef}>
          <div className={styles.hamburgerMenuIcon} onClick={handleMenuToggle}><FontAwesomeIcon icon={faBars} style={{ color: "#252c36", }} /> Menu</div>
        </div>
        {(isLoaded && isSignedIn) && <div className={styles.userbutton}>
          <UserButton afterSignOutUrl='/' /></div>}
      </div>}

      {isOpen && (createPortal(
        <div ref={hamburgerMenuRef} style={{ position: 'absolute', top: `${menuTopLeft.screenX}px`, left: `${menuTopLeft.screenY}px`, zIndex: 1 }}>
          <div className={style.border}>
            <div className={styles.hamburgerMenu}>
              <div className={styles.navitem}>
                <Link className={styles.link} onClick={() => setIsOpen(false)} href="/forums_ic"><FontAwesomeIcon icon={faPersonCirclePlus} style={{ color: "#252c36", }} /> IC</Link>
              </div>
              <div className={styles.navitem}>
                <Link className={styles.link} onClick={() => setIsOpen(false)} href="/forums_ooc"><FontAwesomeIcon icon={faPersonCircleMinus} style={{ color: "#252c36", }} /> OOC</Link>
              </div>
              {(isLoaded && isSignedIn) && <div className={styles.userbutton}>
                <UserButton afterSignOutUrl='/' /></div>}
              {!isSignedIn && <>
                <div className={styles.navitem}>
                  <Link className={styles.link} href="/sign-in" onClick={() => setIsOpen(false)}><FontAwesomeIcon icon={faArrowRightToBracket} style={{ color: "#252c36", }} /> Sign In</Link>
                </div>
                <div className={styles.navitem}>
                  <Link className={styles.link} href="/sign-up" onClick={() => setIsOpen(false)}><FontAwesomeIcon icon={faUserPlus} style={{ color: "#252c36", }} /> Sign Up</Link>
                </div>
              </>}
            </div>
          </div>
        </div>,
        document.getElementById("menuRoot")!))}
    </div>
  )
}