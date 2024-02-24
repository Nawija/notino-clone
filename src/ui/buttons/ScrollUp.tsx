"use client";
import "@/src/ui/buttons/scrollUp.css";

import { useEffect, useState } from "react";

export default function ScrollUp() {
  const [scrollUp, setScrollUp] = useState(false);

  useEffect(() => {
    const handleScrollListener = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition > 1300) {
        setScrollUp(true);
      } else {
        setScrollUp(false);
      }
    };
    window.addEventListener("scroll", handleScrollListener);
    return () => {
      window.removeEventListener("scroll", handleScrollListener);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`bg-main border-main transition-colors duration-300 fixed bottom-3 right-3 rounded-lg border p-1.5 text-white hover:bg-zinc-800 lg:p-2.5 ${
        scrollUp ? "slide-left" : "hidden"
      }`}
      onClick={scrollToTop}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.8}
        stroke="currentColor"
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4.5 15.75 7.5-7.5 7.5 7.5"
        />
      </svg>
    </button>
  );
}
