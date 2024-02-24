"use client";

import { NAV_LINKS } from "@/src/constants";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { LuUser2 } from "react-icons/lu";
import { SlBasket } from "react-icons/sl";
import { Logo } from "../ui/svg/Logo";

const SearchBar = dynamic(() => import("@/src/components/SearchBar"));

const Header = () => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const controlNavbarAndHeaderBackground = useCallback(() => {
    if (typeof window !== "undefined") {
      const currentScrollY = window.scrollY;
      const newVisible = lastScrollY > currentScrollY || currentScrollY < 800;

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
      className={`bg-main sticky top-0 z-50 w-full px-6 pb-3 pt-5 text-sm font-medium transition-all duration-300 ease-in-out ${
        !visible ? "-translate-y-[120%]" : ""
      }`}
    >
      <nav className={` mx-auto flex w-full items-center justify-between`}>
        <Link href="/" onClick={closeMenu}>
          <Logo h={27} w={27} />
        </Link>

        <SearchBar />
        <div className="flex items-center justify-center space-x-5">
          <LuUser2 className="text-2xl text-white " />
          <CiHeart className="text-2xl text-white " />
          <button className="flex-c">
            <SlBasket className="fill-white text-2xl " />
            <p>Koszyk</p>
          </button>
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
      <nav className="mt-4">
        <ul className="text-second flex">
          <li>
            <Link
              href="/promocje"
              className={`bg-pink-700 px-2 py-0.5 text-lg font-semibold transition-colors duration-300 hover:text-white lg:text-sm lg:font-medium`}
              onClick={closeMenu}
            >
              Promocje
            </Link>
          </li>
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={`px-4 py-2 text-lg font-semibold transition-colors duration-300 hover:text-white lg:text-sm lg:font-medium`}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
