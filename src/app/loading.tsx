export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">

      <div className="text-center">

        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#661093] border-t-transparent" />

        <p className="mt-4 text-sm text-neutral-600">
          Loading...
        </p>

      </div>

    </div>
  );
}