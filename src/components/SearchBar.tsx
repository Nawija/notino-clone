"use client"

import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PORTFOLIO } from "../constants";
import { PortfolioItem } from "../types";

const SearchParams = dynamic(() => import("@/src/components/SearchParams"));

export default function SearchBar() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("szukaj") || "");
  const [filteredProducts, setFilteredProducts] = useState<PortfolioItem[]>([]);
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.length >= 2) {
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setFilteredProducts([]);
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
    <div className="relative mr-5" ref={inputRef}>
      <form>
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Szukaj"
          className="w-44 rounded-md border border-gray-300 px-2 py-1"
        />
      </form>
      {filteredProducts.length > 0 && (
        <div className="border-second anim-opacity no-scrollbar absolute -left-1/2 top-10 z-10 h-max max-h-[40vh] w-80 overflow-y-auto rounded-lg border bg-gray-100/10 p-6 backdrop-blur-xl lg:left-0">
          <p className="text-main mb-4">Szukane:</p>
          <ul className="flex flex-col items-center justify-center space-y-2">
            {filteredProducts.slice(0, 6).map((item, index) => (
              <SearchParams
                item={item}
                key={index}
                clearFilterProducts={clearFilterProducts}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
