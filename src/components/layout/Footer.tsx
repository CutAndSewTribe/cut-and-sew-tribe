import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">

      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-3">

        <div>
          <h2 className="text-lg font-semibold text-[#661093]">
            Cut & Sew Tribe
          </h2>

          <p className="mt-3 text-sm text-neutral-600">
            Learn fashion design, sewing, and garment creation
            from beginner level to professional mastery.
          </p>
        </div>


        <div>
          <h3 className="font-medium">
            Explore
          </h3>

          <div className="mt-3 flex flex-col gap-2 text-sm">

            <Link href="/courses">
              Courses
            </Link>

            <Link href="/videos">
              Videos
            </Link>

            <Link href="/patterns">
              Patterns
            </Link>

            <Link href="/resources">
              Resources
            </Link>

          </div>
        </div>


        <div>
          <h3 className="font-medium">
            Community
          </h3>

          <p className="mt-3 text-sm text-neutral-600">
            Join thousands of creatives building fashion skills.
          </p>
        </div>

      </div>

    </footer>
  );
}
