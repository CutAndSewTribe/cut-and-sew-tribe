"use client";


export default function Error({
  reset,
}: {
  reset: () => void;
}) {

  return (
    <div className="flex min-h-[50vh] items-center justify-center px-6">

      <div className="text-center">


        <h1 className="text-3xl font-bold">
          Something went wrong
        </h1>


        <p className="mt-4 text-neutral-600">
          We could not load this page.
        </p>


        <button
          onClick={reset}
          className="mt-6 rounded-full bg-[#661093] px-6 py-3 text-sm font-medium text-white"
        >
          Try again
        </button>


      </div>

    </div>
  );
}