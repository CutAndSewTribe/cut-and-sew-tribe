interface ContentGridProps {
children: React.ReactNode;
}

export default function ContentGrid({
children,
}: ContentGridProps) {
return ( <div className="grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
{children} </div>
);
}
