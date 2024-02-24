import clsx from "clsx";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function MainBtn({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        "border-main relative rounded-lg bg-white px-5 py-2 text-sm font-semibold text-black/90 transition-colors duration-300 hover:bg-zinc-300 hover:text-black",
        className,
      )}
    >
      {children}
    </button>
  );
}
