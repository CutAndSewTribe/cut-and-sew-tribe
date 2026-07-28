interface DashboardHeroProps {
  firstName: string;
}

export default function DashboardHero({
  firstName,
}: DashboardHeroProps) {
  return (
    <section className="overflow-hidden rounded-3xl bg-linear-to-r from-[#661093] to-[#7b2cbf] p-8 text-white shadow-lg">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
          Student Dashboard
        </p>

        <h1 className="mt-4 text-4xl font-bold">
          Welcome back, {firstName} 👋
        </h1>

        <p className="mt-4 text-lg leading-8 text-white/85">
          Continue building your fashion skills.
          Every completed lesson moves you closer to becoming a professional fashion designer.
        </p>
      </div>
    </section>
  );
}