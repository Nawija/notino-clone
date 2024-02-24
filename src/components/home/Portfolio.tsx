import { PORTFOLIO } from "@/src/constants/index";
import dynamic from "next/dynamic";
import Link from "next/link";
import { PortfolioItemSkeleton } from "../ui/Skeletons";

const PortfolioItemComponent = dynamic(
  () => import("./PortfolioItemComponent"),
  {
    loading: () => <PortfolioItemSkeleton />,
  },
);

export default function Portfolio() {
  return (
    <section className="mx-auto">
      <div className="flex-b">
        <h2 className="text-main text-lg lg:text-2xl">
          Most Popular Framer Templates
        </h2>
        <Link
          href="/szablony"
          className="flex-c transition-colors duration-300 hover:text-white"
        >
          <p className="text-xs lg:text-sm">Więcej</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="ml-1.5 h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </Link>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {PORTFOLIO.slice(0, 8).map((item) => (
          <PortfolioItemComponent key={item.label} item={item} />
        ))}
      </div>
    </section>
  );
}
