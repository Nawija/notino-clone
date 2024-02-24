"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import { BreadcrumbTypes } from "../types";

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: BreadcrumbTypes[];
}) {
  const router = useRouter();
  const liClass = "hover:text-white transition-colors duration-300";
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center justify-start space-x-8 px-2 py-2 text-sm lg:px-6">
        <li key="powrot" className={liClass}>
          <button onClick={() => router.back()} className="flex-c">
            <IoArrowBack className="mr-1" />
            Powrót
          </button>
        </li>
        {breadcrumbs.map((breadcrumb: BreadcrumbTypes, index: number) => (
          <li key={index} className={`list-disc capitalize ${liClass}`}>
            {breadcrumb.href ? (
              <Link href={breadcrumb.href}>{breadcrumb.title}</Link>
            ) : (
              <span>{breadcrumb.title}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
