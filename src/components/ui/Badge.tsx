interface BadgeProps {
  children: React.ReactNode;
}

export default function Badge({
  children,
}: BadgeProps) {
  return (
    <span
      className="inline-flex rounded-full bg-[#661093]/10 px-3 py-1 text-sm font-medium text-[#661093]"
    >
      {children}
    </span>
  );
}
