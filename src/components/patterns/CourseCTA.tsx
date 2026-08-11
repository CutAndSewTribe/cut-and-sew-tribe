import Link from "next/link";

export default function CourseCTA() {
return ( <div className="my-10 rounded-3xl border border-[#661093]/15 bg-[#661093]/5 p-6"> <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#661093]">
Continue your fashion journey </div>

```
  <h3 className="mt-2 text-2xl font-bold text-neutral-900">
    Ready to build professional fashion skills?
  </h3>

  <p className="mt-3 text-neutral-700">
    Explore all Cut And Sew Tribe courses and learn pattern drafting,
    garment construction, sewing techniques, and fashion business through
    a complete structured curriculum.
  </p>

  <Link
    href="/courses"
    className="mt-5 inline-flex items-center rounded-xl bg-[#661093] px-5 py-3 font-semibold text-white transition hover:bg-[#55107d]"
  >
    Browse All Courses
  </Link>
</div>


);
}
