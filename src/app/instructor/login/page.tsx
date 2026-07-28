import InstructorLoginForm from "./InstructorLoginForm";

export default function InstructorLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-100 px-6 py-12">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#661093]">
            Cut and Sew Tribe
          </p>

          <h1 className="mt-3 text-3xl font-bold text-neutral-900">
            Instructor Login
          </h1>

          <p className="mt-3 text-neutral-600">
            Sign in to manage your courses, modules, and lessons.
          </p>
        </div>

        <InstructorLoginForm />
      </div>
    </main>
  );
}

