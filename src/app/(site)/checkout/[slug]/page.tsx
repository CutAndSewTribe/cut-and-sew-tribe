import {
notFound,
redirect,
} from "next/navigation";

import {
Container,
Section,
} from "@/components/ui";

import { PageHero } from "@/components/shared";

import CheckoutSidebar from "@/components/checkout/CheckoutSidebar";

import { getCurrentUser } from "@/lib/auth/get-user";

import { getCourseBySlug } from "@/lib/lms/courses";

export default async function CheckoutPage({
params,
}: {
params: Promise<{
slug: string;
}>;
}) {
const user = await getCurrentUser();

if (!user) {
redirect("/login");
}

const { slug } = await params;

const course = await getCourseBySlug(slug);

if (!course) {
notFound();
}

return ( <div> <PageHero
     label="Checkout"
     title={course.title}
     description="Complete your enrollment securely."
   />

```
  <Section>
    <Container className="max-w-3xl">
      <div
        className="
          rounded-3xl
          border
          border-neutral-200
          bg-white
          p-8
          shadow-sm
        "
      >
        <h2
          className="
            text-3xl
            font-bold
            text-neutral-900
          "
        >
          {course.title}
        </h2>

        {course.description && (
          <p
            className="
              mt-4
              text-neutral-600
            "
          >
            {course.description}
          </p>
        )}

        <div className="mt-8">
          <p
            className="
              text-sm
              font-semibold
              text-neutral-500
            "
          >
            Price
          </p>

          <p
            className="
              mt-2
              text-4xl
              font-bold
              text-[#661093]
            "
          >
            {course.currency}{" "}
            {course.price.toLocaleString()}
          </p>
        </div>

        <div className="mt-10">
          <CheckoutSidebar
            slug={course.slug}
            email={user.email ?? ""}
          />
        </div>
      </div>
    </Container>
  </Section>
</div>

);
}
