import type { ReactNode } from "react";

import InstructorSidebar from "./InstructorSidebar";
import InstructorTopbar from "./InstructorTopbar";

interface Props {
  children: ReactNode;
}

export default function InstructorLayout({
  children,
}: Props) {
  return (
    <div className="min-h-screen bg-neutral-100">

      <div className="flex">

        {/* Sidebar */}

        <InstructorSidebar />

        {/* Main */}

        <div className="flex min-h-screen flex-1 flex-col">

          <InstructorTopbar />

          <main className="flex-1 p-8">
            {children}
          </main>

        </div>

      </div>

    </div>
  );
}