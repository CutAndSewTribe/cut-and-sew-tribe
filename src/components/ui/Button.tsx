import Link from "next/link";
import type {
  MouseEventHandler,
  ReactNode,
} from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  className?: string;
  type?: "button" | "submit";
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({
  children,
  href,
  className = "",
  type = "button",
  fullWidth = false,
  disabled = false,
  onClick,
}: ButtonProps) {
  const styles = `
    inline-flex
    items-center
    justify-center
    rounded-full
    px-6
    py-3
    text-sm
    font-semibold
    transition
    duration-300
    bg-[#661093]
    text-white
    hover:bg-[#7A16AF]
    disabled:cursor-not-allowed
    disabled:opacity-60
    ${fullWidth ? "w-full" : ""}
    ${className}
  `;

  if (href) {
    return (
      <Link
        href={href}
        className={styles}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={styles}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}