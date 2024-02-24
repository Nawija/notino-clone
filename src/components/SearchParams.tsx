"use client";

import Link from "next/link";
import { PortfolioItem } from "../types";

export default function SearchParams({
  item,
  clearFilterProducts,
}: {
  item: PortfolioItem;
  clearFilterProducts: () => void;
}) {
  const { id, url, label, price } = item;
  return (
    <li className="w-full p-2 ">
      <Link
        onClick={clearFilterProducts}
        href={`/szablony/${id}`}
        className="flex items-start justify-between space-x-2 p-2 transition-colors hover:bg-zinc-100"
      >
        <img src={url} className="h-16 w-28 object-cover object-top" />
        <div>
          <p className="text-main">{label}</p>
          <p className="text-sm">{price}zł</p>
        </div>
      </Link>
    </li>
  );
}
