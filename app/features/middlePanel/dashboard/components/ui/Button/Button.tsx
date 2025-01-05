import React, { ButtonHTMLAttributes } from "react";
import classNames from "classnames";

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, disabled, ...props }: Props) {
  return (
    <button
      className={classNames(
        "px-4 py-2 rounded bg-gray-100 text-gray-700 text-sm font-medium transition-all",
        "hover:bg-gray-200 active:bg-gray-300",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
