"use client";

import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Iron from "@hapi/iron";

import styles from "@/styles/Nav.module.css"; // general styling
import style from "@/styles/Layout.module.css"; // for dropdown menu border

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faLandmarkDome,
  faScroll,
  faArrowRightToBracket,
  faUserPlus,
  faPersonCirclePlus,
  faPersonCircleMinus,
  faMonument,
  faUser,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import UpdateSession from "@/lib/logout/updateSession";
import SessionData from "@/actions/Server/sessionData";
import { AuthContext } from "@/context/AuthContextProvider/AuthContext";
import { SessionContext } from "@/context/SessionContextProvider/SessionContext";

export default function Nav() {
  const router = useRouter();

  // authentication context
  const [isAuth, setIsAuth] = useContext(AuthContext);

  // session context
  const [isSession, setIsSession] = useContext(SessionContext);

  const [unseal, setUnseal] = useState<{
    userID: string;
    email: string;
    userIP: string;
    randomNano: string;
  }>({
    userID: "",
    email: "",
    userIP: "",
    randomNano: "",
  });

  // TODO replace this useEffect with a Tanstack useQuery()
  useEffect(() => {
    async function fetchData() {
      const unsealed = await SessionData();

      setUnseal((prevSeal) => ({
        ...prevSeal,
        userID: unsealed.userID,
        email: unsealed.email,
        userIP: unsealed.userIP,
        randomNano: unsealed.randomNano,
      }));
    }
    if (isSession !== "" && isAuth === true) {
      fetchData();
    }
  }, [isAuth, isSession]);

  // state for dropdown menu toggle
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  // dropdown menu toggle function
  const handleMenuToggle = (event: any) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  // state to store Menu icon Top and Left coordinates
  const [menuTopLeft, setMenuTopLeft] = React.useState<{
    screenY: number;
    screenX: number;
  }>({ screenY: 0, screenX: 0 });

  // state to define `window` object
  const [windowWidth, setWindowWidth] = React.useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  // useeffect to auto-close dropdown menu at specific width
  React.useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setWindowWidth(window.innerWidth);
      }
    };

    window.addEventListener("resize", handleResize);

    if (typeof window !== "undefined" && windowWidth > 1150) {
      setIsOpen(false);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  // useEffect to return Menu icon's coordinates for dropdown menu rendering
  React.useEffect(() => {
    // define menuIcon div element for 775 and 1150 pixels
    const menuIcon1150 = document.getElementById("menuRoot1150");
    const menuIcon775 = document.getElementById("menuRoot775");

    // existence check
    if (!(menuIcon1150 || menuIcon775)) {
      return;
    }

    // put dropdown menu to calculated coordinates between 775 and 1150 pixels
    const iconRect1150 = menuIcon1150?.getBoundingClientRect();
    const iconLeft1150 = iconRect1150?.right! + window.scrollX - 180;
    const newTop1150 = iconRect1150?.bottom! + window.scrollY + 18;
    setMenuTopLeft({ screenY: newTop1150, screenX: iconLeft1150 });

    // put dropdown menu to claculated coordinates for 775 and lower pixels
    const iconRect775 = menuIcon775?.getBoundingClientRect();
    const iconLeft775 = iconRect775?.right! + window.scrollX - 180;
    const newTop775 = iconRect775?.bottom! + window.scrollY + 18;
    setMenuTopLeft({ screenY: newTop775, screenX: iconLeft775 });

    // move dropdown menu on resize between 775 and 1150 pixels
    const handleResize1150 = () => {
      const iconRect = menuIcon1150?.getBoundingClientRect();
      const iconleft = iconRect?.right! + window.scrollX - 180;
      const newTop = iconRect?.bottom! + window.scrollY + 18;
      setMenuTopLeft({ screenY: newTop, screenX: iconleft });
    };

    // move dropdown menu on resize between for 775 and lower pixels
    const handleResize775 = () => {
      const iconRect = menuIcon775?.getBoundingClientRect();
      const iconleft = iconRect?.right! + window.scrollX - 180;
      const newTop = iconRect?.bottom! + window.scrollY + 18;
      setMenuTopLeft({ screenY: newTop, screenX: iconleft });
    };

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
    };
  }, [windowWidth]);

  // dropdown menu reference
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // auto-close dorpdown menu if clicks are outside of dropdown menu context
  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // call auto-close function for dropdown menu with useEffect
  React.useEffect(() => {
    if (isOpen) {
      window.addEventListener("click", handleClickOutside);
    } else {
      window.removeEventListener("click", handleClickOutside);
    }
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* Main menu */}
      {
        <div className={styles.navbar}>
          <div className={styles.navitem}>
            <Link className={styles.link} href="/">
              <FontAwesomeIcon
                icon={faLandmarkDome}
                style={{ color: "#252c36" }}
              />{" "}
              Főoldal
            </Link>
          </div>
          <div className={styles.navitem}>
            <Link className={styles.link} href="/rules">
              <FontAwesomeIcon icon={faScroll} style={{ color: "#252c36" }} />{" "}
              Szabályzat
            </Link>
          </div>
          {/* <div className={styles.navitem}>
          <Link className={styles.link} href="/history"><FontAwesomeIcon icon={faMonument} style={{ color: "#252c36", }} /> Történelem</Link>
        </div> */}

          <div className={styles.navitem}>
            <Link className={styles.link} href="/forums_ic">
              <FontAwesomeIcon
                icon={faPersonCirclePlus}
                style={{ color: "#252c36" }}
              />{" "}
              IC
            </Link>
          </div>
          <div className={styles.navitem}>
            <Link className={styles.link} href="/forums_ooc">
              <FontAwesomeIcon
                icon={faPersonCircleMinus}
                style={{ color: "#252c36" }}
              />{" "}
              OOC
            </Link>
          </div>
          {isAuth && (
            <>
              <div className={styles.navitem}>
                <FontAwesomeIcon icon={faUser} style={{ color: "#252c36" }} />{" "}
                Adatlap
              </div>
              <div
                className={styles.navitem}
                onClick={async () => {
                  await UpdateSession(unseal.userID);
                  setIsAuth(false);
                  setIsSession("");
                  router.push("/");
                }}
              >
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  style={{ color: "#252c36" }}
                />{" "}
                Kilépés
              </div>
            </>
          )}

          {!isAuth && (
            <>
              <div className={styles.navitem}>
                <Link className={styles.link} href="/auth/signin">
                  <FontAwesomeIcon
                    icon={faArrowRightToBracket}
                    style={{ color: "#252c36" }}
                  />{" "}
                  Belépés
                </Link>
              </div>
              <div className={styles.navitem}>
                <Link className={styles.link} href="/auth/signup">
                  <FontAwesomeIcon
                    icon={faUserPlus}
                    style={{ color: "#252c36" }}
                  />{" "}
                  Regisztráció
                </Link>
              </div>
            </>
          )}
        </div>
      }

      {/* Shrunken menu @ < 1150px  */}
      {
        <div className={styles.shrunkMenu1150}>
          <div className={styles.navitem}>
            <Link
              className={styles.link}
              href="/"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <FontAwesomeIcon
                icon={faLandmarkDome}
                style={{ color: "#252c36" }}
              />{" "}
              Főoldal
            </Link>
          </div>
          <div className={styles.navitem}>
            <Link
              className={styles.link}
              href="/rules"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <FontAwesomeIcon icon={faScroll} style={{ color: "#252c36" }} />{" "}
              Szabályzat
            </Link>
          </div>
          {/* <div className={styles.navitem}>
          <Link className={styles.link} href="/history" onClick={() => { setIsOpen(false) }}><FontAwesomeIcon icon={faMonument} style={{ color: "#252c36", }} /> Történelem</Link>
        </div> */}
          <div className={styles.navitem}>
            <div
              id="menuRoot1150"
              className={styles.hamburgerMenuIcon}
              onClick={handleMenuToggle}
            >
              <FontAwesomeIcon icon={faBars} style={{ color: "#252c36" }} />{" "}
              Menü
            </div>
          </div>
        </div>
      }

      {/* Shrunken menu @ < 775px  */}
      {
        <div className={styles.shrunkMenu775}>
          <div className={styles.navitem}>
            <Link
              className={styles.link}
              href="/"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <FontAwesomeIcon
                icon={faLandmarkDome}
                style={{ color: "#252c36" }}
              />{" "}
              Főoldal
            </Link>
          </div>
          <div className={styles.navitem}>
            <div
              id="menuRoot775"
              className={styles.hamburgerMenuIcon}
              onClick={handleMenuToggle}
            >
              <FontAwesomeIcon icon={faBars} style={{ color: "#252c36" }} />{" "}
              Menü
            </div>
          </div>
        </div>
      }

      {/* Open dorpdown menu on onClick event at 1150 pixels */}
      {windowWidth >= 775 && windowWidth <= 1150 && isOpen && (
        <div
          style={{
            position: "absolute",
            top: `${menuTopLeft.screenY}px`,
            left: `${menuTopLeft.screenX}px`,
            zIndex: 1,
          }}
          ref={dropdownRef}
        >
          <div className={style.border}>
            <div className={styles.hamburgerMenu}>
              <div className={styles.navitem}>
                <Link
                  className={styles.link}
                  onClick={() => setIsOpen(false)}
                  href="/forums_ic"
                >
                  <FontAwesomeIcon
                    icon={faPersonCirclePlus}
                    style={{ color: "#252c36" }}
                  />{" "}
                  IC
                </Link>
              </div>
              <div className={styles.navitem}>
                <Link
                  className={styles.link}
                  onClick={() => setIsOpen(false)}
                  href="/forums_ooc"
                >
                  <FontAwesomeIcon
                    icon={faPersonCircleMinus}
                    style={{ color: "#252c36" }}
                  />{" "}
                  OOC
                </Link>
              </div>
              {isAuth && (
                <>
                  <div className={styles.navitem}>
                    <FontAwesomeIcon
                      icon={faUser}
                      style={{ color: "#252c36" }}
                    />{" "}
                    Adatlap
                  </div>
                  <div
                    className={styles.navitem}
                    onClick={async () => {
                      await UpdateSession(unseal.userID);
                      setIsAuth(false);
                      setIsSession("");
                      router.push("/");
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faArrowRightFromBracket}
                      style={{ color: "#252c36" }}
                    />{" "}
                    Kilépés
                  </div>
                </>
              )}

              {!isAuth && (
                <>
                  <div className={styles.navitem}>
                    <Link
                      className={styles.link}
                      href="/auth/signin"
                      onClick={() => setIsOpen(false)}
                    >
                      <FontAwesomeIcon
                        icon={faArrowRightToBracket}
                        style={{ color: "#252c36" }}
                      />{" "}
                      Bejelentkezés
                    </Link>
                  </div>
                  <div className={styles.navitem}>
                    <Link
                      className={styles.link}
                      href="/auth/signup"
                      onClick={() => setIsOpen(false)}
                    >
                      <FontAwesomeIcon
                        icon={faUserPlus}
                        style={{ color: "#252c36" }}
                      />{" "}
                      Regisztráció
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Open dorpdown menu on onClick event at 775 pixels */}
      {windowWidth <= 775 && isOpen && (
        <div
          style={{
            position: "absolute",
            top: `${menuTopLeft.screenY}px`,
            left: `${menuTopLeft.screenX}px`,
            zIndex: 1,
          }}
          ref={dropdownRef}
        >
          <div className={style.border}>
            <div className={styles.hamburgerMenu}>
              <div className={styles.navitem}>
                <Link
                  className={styles.link}
                  href="/rules"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faScroll}
                    style={{ color: "#252c36" }}
                  />{" "}
                  Szabályzat
                </Link>
              </div>
              {/* <div className={styles.navitem}>
                <Link className={styles.link} href="/history" onClick={() => { setIsOpen(false) }}><FontAwesomeIcon icon={faMonument} style={{ color: "#252c36", }} /> Történelem</Link>
              </div> */}
              <div className={styles.navitem}>
                <Link
                  className={styles.link}
                  onClick={() => setIsOpen(false)}
                  href="/forums_ic"
                >
                  <FontAwesomeIcon
                    icon={faPersonCirclePlus}
                    style={{ color: "#252c36" }}
                  />{" "}
                  IC
                </Link>
              </div>
              <div className={styles.navitem}>
                <Link
                  className={styles.link}
                  onClick={() => setIsOpen(false)}
                  href="/forums_ooc"
                >
                  <FontAwesomeIcon
                    icon={faPersonCircleMinus}
                    style={{ color: "#252c36" }}
                  />{" "}
                  OOC
                </Link>
              </div>
              {isAuth && (
                <>
                  <div className={styles.navitem}>
                    <FontAwesomeIcon
                      icon={faUser}
                      style={{ color: "#252c36" }}
                    />{" "}
                    Adatlap
                  </div>
                  <div
                    className={styles.navitem}
                    onClick={async () => {
                      await UpdateSession(unseal.userID);
                      setIsAuth(false);
                      setIsSession("");
                      router.push("/");
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faArrowRightFromBracket}
                      style={{ color: "#252c36" }}
                    />{" "}
                    Kilépés
                  </div>
                </>
              )}

              {!isAuth && (
                <>
                  <div className={styles.navitem}>
                    <Link
                      className={styles.link}
                      href="/auth/signin"
                      onClick={() => setIsOpen(false)}
                    >
                      <FontAwesomeIcon
                        icon={faArrowRightToBracket}
                        style={{ color: "#252c36" }}
                      />{" "}
                      Bejelentkezés
                    </Link>
                  </div>
                  <div className={styles.navitem}>
                    <Link
                      className={styles.link}
                      href="/auth/signup"
                      onClick={() => setIsOpen(false)}
                    >
                      <FontAwesomeIcon
                        icon={faUserPlus}
                        style={{ color: "#252c36" }}
                      />{" "}
                      Regisztráció
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
