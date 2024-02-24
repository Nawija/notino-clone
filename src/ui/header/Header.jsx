"use client";

import { NAV_LINKS } from "@/src/constants";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { MainBtn } from "../buttons/MainBtn";
import { SecondBtn } from "../buttons/SecondBtn";
import { Logo } from "../svg/Logo";

const SearchBar = dynamic(() => import("@/src/components/SearchBar"));

const Header = () => {
  const pathname = usePathname();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const controlNavbarAndHeaderBackground = useCallback(() => {
    if (typeof window !== "undefined") {
      const currentScrollY = window.scrollY;
      const newVisible = lastScrollY > currentScrollY || currentScrollY < 40;

      if (newVisible !== visible) setVisible(newVisible);
      if (currentScrollY !== lastScrollY) setLastScrollY(currentScrollY);
    }
  }, [lastScrollY, visible]);

  useEffect(() => {
    window.addEventListener("scroll", controlNavbarAndHeaderBackground);
    return () =>
      window.removeEventListener("scroll", controlNavbarAndHeaderBackground);
  }, [controlNavbarAndHeaderBackground]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prevState) => !prevState);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const target = event.target;
      if (isMenuOpen && target && !target.closest("nav")) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.body.style.height = "100vh";
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.height = "";
      document.body.style.overflow = "";
    }

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`bg-body border-second sticky top-0 z-50 w-full border-b px-6 py-4 text-sm font-medium transition-all duration-500 ease-in-out lg:py-3 ${
        !visible ? "-translate-y-[120%]" : ""
      }`}
    >
      <nav
        className={` mx-auto flex w-full max-w-screen-2xl items-center justify-between `}
      >
        <Link href="/" onClick={closeMenu} className="z-10 mr-12 text-white">
          <Logo h={27} w={27} />
        </Link>
        <ul
          className={`border-main bg-main absolute left-0 top-0 flex h-screen w-72 flex-col items-center justify-center space-y-7 border-r px-12 backdrop-blur-sm transition-transform lg:absolute lg:left-1/2 lg:top-1/2 lg:h-auto lg:w-max lg:-translate-x-1/2 lg:-translate-y-1/2 lg:flex-row lg:items-center lg:justify-center lg:space-y-0 lg:rounded-lg lg:border lg:bg-none lg:px-4 lg:py-2 lg:backdrop-blur-none ${
            isMenuOpen
              ? "translate-x-0 duration-200 "
              : "-translate-x-full duration-500"
          } `}
        >
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={`rounded-xl px-4 py-2 text-lg font-semibold transition-colors duration-300 hover:text-white lg:text-sm lg:font-medium ${
                  pathname === link.href ? "text-white" : ""
                }`}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            </li>
          ))}

          <li>
            <Link href="/szablony" onClick={closeMenu} className="lg:hidden">
              <SecondBtn className="mt-2 w-52">Szablony</SecondBtn>
            </Link>
          </li>

          <li>
            <Link
              href="darmowa-wycena"
              onClick={closeMenu}
              className="lg:hidden "
            >
              <MainBtn className="w-52">Wycena</MainBtn>
            </Link>
          </li>
        </ul>
        <div className="flex items-center justify-center">
          <SearchBar />
          <Link href="/szablony" className="mr-4 hidden lg:flex">
            <SecondBtn>Szablony</SecondBtn>
          </Link>
          <Link href="darmowa-wycena" className=" hidden lg:flex">
            <MainBtn>Wycena</MainBtn>
          </Link>
        </div>
        <button
          aria-label="Menu"
          className="flex flex-col items-end justify-center p-2 lg:hidden"
          onClick={toggleMenu}
        >
          <div
            className={`mb-2 h-[2px] bg-white transition-transform ${
              isMenuOpen
                ? "w-5 translate-y-1 rotate-[-135deg] duration-200"
                : "w-5 duration-300"
            }`}
          />
          <div
            className={`h-[2px] w-5 bg-white transition-transform ${
              isMenuOpen
                ? "-translate-y-1.5 rotate-[315deg] duration-500"
                : "duration-500"
            }`}
          />
        </button>
      </nav>
    </header>
  );
};

export default Header;
