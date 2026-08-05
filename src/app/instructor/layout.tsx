import type { ReactNode } from "react";

export default function InstructorRootLayout({
children,
}: {
children: ReactNode;
}) {
// The public website layout (Header/Footer) should not wrap instructor pages.
// Authentication routes under (auth) and CMS routes under (protected) provide
// their own layouts, so this root layout simply provides a clean boundary.
return <>{children}</>;
}
