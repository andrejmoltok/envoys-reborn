'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { UserButton, useAuth } from '@clerk/nextjs';
import styles from '@/styles/Nav.module.css'; // general styling
import style from '@/styles/Layout.module.css'; // for dropdown menu border
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faLandmarkDome,
  faScroll,
  faArrowRightToBracket,
  faUserPlus,
  faPersonCirclePlus,
  faPersonCircleMinus,
  faMonument
} from '@fortawesome/free-solid-svg-icons';
// import Profile from '@/components/Profile';

export default function Nav() {

  // Clerk authentication check
  const { isSignedIn, isLoaded } = useAuth();

  // state for dropdown menu toggle
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // dropdown menu toggle function
  const handleMenuToggle = (event: any) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  // state to store Menu icon Top and Left coordinates
  const [menuTopLeft, setMenuTopLeft] = useState<{ screenY: number, screenX: number }>({ screenY: 0, screenX: 0 });

  // state to define `window` object
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  // useeffect to auto-close dropdown menu at specific width
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

  // useEffect to return Menu icon's coordinates for dropdown menu rendering
  useEffect(() => {
    // define menuIcon div element for 775 and 1150 pixels
    const menuIcon1150 = document.getElementById("menuRoot1150");
    const menuIcon775 = document.getElementById("menuRoot775");

    // existence check
    if (!(menuIcon1150 || menuIcon775)) {
      console.log('no menuIcon')
      return;
    }

    // put dropdown menu to calculated coordinates between 775 and 1150 pixels
    const iconRect1150 = menuIcon1150?.getBoundingClientRect();
    const iconLeft1150 = iconRect1150?.right + window.scrollX - 140;
    const newTop1150 = iconRect1150?.bottom + window.scrollY + 18;
    setMenuTopLeft({ screenY: newTop1150, screenX: iconLeft1150 });

    // put dropdown menu to claculated coordinates for 775 and lower pixels
    const iconRect775 = menuIcon775?.getBoundingClientRect();
    const iconLeft775 = iconRect775?.right + window.scrollX - 140;
    const newTop775 = iconRect775?.bottom + window.scrollY + 18;
    setMenuTopLeft({ screenY: newTop775, screenX: iconLeft775 });

    // move dropdown menu on resize between 775 and 1150 pixels
    const handleResize1150 = () => {
      const iconRect = menuIcon1150?.getBoundingClientRect();
      const iconleft = iconRect?.right + window.scrollX - 140;
      const newTop = iconRect?.bottom + window.scrollY + 18;
      console.log('screenY', newTop, 'screenX', iconleft, 'windowWidth', windowWidth);
      setMenuTopLeft({ screenY: newTop, screenX: iconleft });
    }

    // move dropdown menu on resize between for 775 and lower pixels
    const handleResize775 = () => {
      const iconRect = menuIcon775?.getBoundingClientRect();
      const iconleft = iconRect?.right + window.scrollX - 140;
      const newTop = iconRect?.bottom + window.scrollY + 18;
      console.log('screenY', newTop, 'screenX', iconleft, 'windowWidth', windowWidth);
      setMenuTopLeft({ screenY: newTop, screenX: iconleft });
    }

    if (windowWidth > 775) {
      handleResize1150();
      window.addEventListener("resize", handleResize1150);
    }

    if (windowWidth < 775) {
      handleResize775();
      window.addEventListener("resize", handleResize775);
    }

    return () => {
      window.removeEventListener("resize", handleResize1150);
      window.removeEventListener("resize", handleResize775);
    }

  }, [windowWidth]);

  // dropdown menu reference
  const dropdownRef = useRef<HTMLDivElement>(null);

  // auto-close dorpdown menu if clicks are outside of dropdown menu context
  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // call auto-close function for dropdown menu with useEffect
  useEffect(() => {
    if (isOpen) {
      window.addEventListener('click', handleClickOutside);
    } else {
      window.removeEventListener('click', handleClickOutside);
    }
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* Main menu */}
      {<div className={styles.navbar}>
        <div className={styles.navitem}>
          <Link className={styles.link} href="/"><FontAwesomeIcon icon={faLandmarkDome} style={{ color: "#252c36", }} /> Home</Link>
        </div>
        <div className={styles.navitem}>
          <Link className={styles.link} href="/rules"><FontAwesomeIcon icon={faScroll} style={{ color: "#252c36", }} /> Rules</Link>
        </div>
        <div className={styles.navitem}>
          <Link className={styles.link} href="/history"><FontAwesomeIcon icon={faMonument} style={{ color: "#252c36", }} /> History</Link>
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
      </div>}

      {/* Shrunken menu @ < 1150px  */}
      {<div className={styles.shrunkMenu1150}>
        <div className={styles.navitem}>
          <Link className={styles.link} href="/" onClick={() => { setIsOpen(false) }}><FontAwesomeIcon icon={faLandmarkDome} style={{ color: "#252c36", }} /> Home</Link>
        </div>
        <div className={styles.navitem}>
          <Link className={styles.link} href="/rules" onClick={() => { setIsOpen(false) }}><FontAwesomeIcon icon={faScroll} style={{ color: "#252c36", }} /> Rules</Link>
        </div>
        <div className={styles.navitem}>
          <Link className={styles.link} href="/history" onClick={() => { setIsOpen(false) }}><FontAwesomeIcon icon={faMonument} style={{ color: "#252c36", }} /> History</Link>
        </div>
        <div className={styles.navitem} >
          <div id="menuRoot1150" className={styles.hamburgerMenuIcon} onClick={handleMenuToggle}><FontAwesomeIcon icon={faBars} style={{ color: "#252c36", }} /> Menu</div>
        </div>
      </div>}

      {/* Shrunken menu @ < 775px  */}
      {<div className={styles.shrunkMenu775}>
        <div className={styles.navitem}>
          <Link className={styles.link} href="/" onClick={() => { setIsOpen(false) }}><FontAwesomeIcon icon={faLandmarkDome} style={{ color: "#252c36", }} /> Home</Link>
        </div>
        <div className={styles.navitem} >
          <div id="menuRoot775" className={styles.hamburgerMenuIcon} onClick={handleMenuToggle}><FontAwesomeIcon icon={faBars} style={{ color: "#252c36", }} /> Menu</div>
        </div>
      </div>}

      {/* Open dorpdown menu on onClick event at 1150 pixels */}
      {windowWidth >= 775 && windowWidth <= 1150 && isOpen &&
        <div style={{ position: 'absolute', top: `${menuTopLeft.screenY}px`, left: `${menuTopLeft.screenX}px`, zIndex: 1 }} ref={dropdownRef}>
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
        </div>}

      {/* Open dorpdown menu on onClick event at 775 pixels */}
      {windowWidth <= 775 && isOpen &&
        <div style={{ position: 'absolute', top: `${menuTopLeft.screenY}px`, left: `${menuTopLeft.screenX}px`, zIndex: 1 }} ref={dropdownRef}>
          <div className={style.border}>
            <div className={styles.hamburgerMenu}>
              <div className={styles.navitem}>
                <Link className={styles.link} href="/rules" onClick={() => { setIsOpen(false) }}><FontAwesomeIcon icon={faScroll} style={{ color: "#252c36", }} /> Rules</Link>
              </div>
              <div className={styles.navitem}>
                <Link className={styles.link} href="/history" onClick={() => { setIsOpen(false) }}><FontAwesomeIcon icon={faMonument} style={{ color: "#252c36", }} /> History</Link>
              </div>
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
        </div>}
    </>
  )
}