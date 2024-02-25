"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MARKI, PORTFOLIO } from "../constants";
import { PortfolioItem } from "../types";

const SearchParams = dynamic(() => import("@/src/components/SearchParams"));

export default function SearchBar() {
  const inputRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("produkty") || "");
  const [filteredProducts, setFilteredProducts] = useState<PortfolioItem[]>([]);
  const [isInputFocused, setIsInputFocused] = useState(false); // New state to track input focus

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.length >= 1) {
        const filteredProducts = PORTFOLIO.filter((product: PortfolioItem) =>
          product.label.toLowerCase().includes(search.toLowerCase()),
        );
        setFilteredProducts(filteredProducts);
      } else {
        setFilteredProducts([]);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [search]);

  const handleFocus = () => {
    setIsInputFocused(true);
    document.body.classList.add("bg-hidden");
    const blurr = document.getElementById("blurr");
    if (blurr) {
      blurr.classList.add("bg-blur");
    }
  };

  const handleBlur = () => {
    setIsInputFocused(false);
    document.body.classList.remove("bg-hidden");
    const blurr = document.getElementById("blurr");
    if (blurr) {
      blurr.classList.remove("bg-blur");
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsInputFocused(false);
    }
  };

  const clearFilterProducts = () => {
    setFilteredProducts([]);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div className="relative mx-4 mr-5 w-full" ref={containerRef}>
      <form>
        <input
          type="text"
          value={search}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleSearchChange}
          placeholder="nazwa produktu,marka"
          className="w-full border border-gray-300 px-2 py-2 text-xs focus:outline-none"
        />
        {isInputFocused && (
          <div
            ref={dropdownRef}
            className="no-scrollbar anim-opacity bg-second absolute left-0 top-full z-10 h-max max-h-[50vh] w-full overflow-y-auto p-4 shadow-2xl"
          >
            <div className="flex w-full items-start justify-start">
              <ul className="flex flex-col items-start justify-start space-y-2">
                {MARKI.slice(0, 6).map((item, index) => (
                  <Link key={index} href={`/${item.label}`}>
                    {item.label}
                  </Link>
                ))}
              </ul>
              <ul className="flex flex-col items-start justify-start space-y-2">
                {filteredProducts.slice(0, 6).map((item, index) => (
                  <SearchParams
                    item={item}
                    key={index}
                    clearFilterProducts={clearFilterProducts}
                  />
                ))}
              </ul>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
