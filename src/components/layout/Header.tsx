import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { SearchBar } from "@/components/shared";


const navigation = [
  {
    label: "Courses",
    href: "/courses",
  },
  {
    label: "Videos",
    href: "/videos",
  },
  {
    label: "Patterns",
    href: "/patterns",
  },
  {
    label: "Resources",
    href: "/resources",
  },
  {
    label: "Success Stories",
    href: "/success-stories",
  },
];


export default function Header() {
  return (
    <header className="w-full border-b border-neutral-200 bg-white">

      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-5">


        <Link
          href="/"
          className="shrink-0 text-xl font-bold tracking-tight text-[#661093]"
        >
          Cut & Sew Tribe
        </Link>



        <nav className="hidden gap-6 md:flex">

          {navigation.map((item) => (

            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-neutral-700 transition hover:text-[#661093]"
            >
              {item.label}
            </Link>

          ))}

        </nav>



        <div className="hidden w-72 lg:block">

          <SearchBar />

        </div>



        <div className="hidden md:block">
  <Link
    href="/courses"
    className="rounded-full bg-[#661093] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#7A16AF]"
  >
    Start Learning
  </Link>
</div>


<MobileMenu />


      </div>

    </header>
  );
}