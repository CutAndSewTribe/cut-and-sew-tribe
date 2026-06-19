import Link from "next/link";


export default function NotFound() {

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6">


      <div className="text-center">


        <h1 className="text-6xl font-bold text-[#661093]">
          404
        </h1>


        <h2 className="mt-4 text-2xl font-semibold">
          Page not found
        </h2>


        <p className="mt-3 text-neutral-600">
          The page you are looking for does not exist.
        </p>


        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-[#661093] px-6 py-3 text-sm font-medium text-white"
        >
          Return Home
        </Link>


      </div>


    </div>
  );
}