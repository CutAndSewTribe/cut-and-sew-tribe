import Link from "next/link";


const exploreLinks = [
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


const supportLinks = [
  {
    label: "Search",
    href: "/search",
  },
  {
    label: "About",
    href: "/",
  },
];


export default function Footer() {

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">


      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-4">


        <div>

          <h2 className="text-lg font-semibold text-[#661093]">
            Cut & Sew Tribe
          </h2>


          <p className="mt-3 text-sm leading-6 text-neutral-600">
            Learn fashion design, sewing, pattern drafting,
            and garment creation from beginner level to
            professional mastery.
          </p>

        </div>



        <div>

          <h3 className="font-medium">
            Explore
          </h3>


          <div className="mt-4 flex flex-col gap-3 text-sm">


            {exploreLinks.map((item) => (

              <Link
                key={item.href}
                href={item.href}
                className="text-neutral-600 hover:text-[#661093]"
              >
                {item.label}
              </Link>

            ))}


          </div>

        </div>



        <div>

          <h3 className="font-medium">
            Support
          </h3>


          <div className="mt-4 flex flex-col gap-3 text-sm">


            {supportLinks.map((item) => (

              <Link
                key={item.href}
                href={item.href}
                className="text-neutral-600 hover:text-[#661093]"
              >
                {item.label}
              </Link>

            ))}


          </div>

        </div>




        <div>

          <h3 className="font-medium">
            Community
          </h3>


          <p className="mt-4 text-sm leading-6 text-neutral-600">
            Join creatives building professional fashion
            skills and turning ideas into garments.
          </p>


        </div>



      </div>



      <div className="border-t border-neutral-200 px-6 py-5 text-center text-sm text-neutral-500">

        © {new Date().getFullYear()} Cut & Sew Tribe.
        All rights reserved.

      </div>


    </footer>
  );
}