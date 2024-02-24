import clsx from "clsx";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function SuccesBtn({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        "border-main relative rounded-lg bg-green-600 px-5 py-2 text-sm font-semibold text-white/90 transition-colors duration-300 hover:bg-green-700 hover:text-white",
        className,
      )}
    >
      {children}
    </button>
  );
}
