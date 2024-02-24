"use client";

import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PORTFOLIO } from "../constants";
import { PortfolioItem } from "../types";

const SearchParams = dynamic(() => import("@/src/components/SearchParams"));

export default function SearchBar() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("produkty") || "");
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
  const handleFocus = () => {
    document.body.classList.toggle('bg-hidden')
  };

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
    <div className="relative mx-4 mr-5 w-full" ref={inputRef}>
      <form>
        <input
          type="text"
          value={search}
          onFocus={handleFocus}
          onBlur={handleFocus}
          onChange={handleSearchChange}
          placeholder="nazwa produktu,marka"
          className=" w-full border border-gray-300 px-2 py-2 text-xs focus:outline-none"
        />
      </form>
      {filteredProducts.length > 0 && (
        <div className="no-scrollbar bg-second absolute left-0 top-full z-10 h-max max-h-[50vh] w-full overflow-y-auto p-4 shadow-2xl">
          <p className="text-main text-gray mb-4">Produkty:</p>
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
