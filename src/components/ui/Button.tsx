import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
}

export default function Button({
  children,
  href,
}: ButtonProps) {

  const classes =
    "inline-flex items-center justify-center rounded-full bg-[#661093] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#7A16AF]";


  if (href) {
    return (
      <Link
        href={href}
        className={classes}
      >
        {children}
      </Link>
    );
  }


  return (
    <button className={classes}>
      {children}
    </button>
  );
}
