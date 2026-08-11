import InstructorPage from "@/components/instructor/layout/InstructorPage";
import PatternStats from "../../../components/instructor/patterns/PatternStats";
import PatternToolbar from "../../../components/instructor/patterns/PatternToolbar";
import PatternTable from "../../../components/instructor/patterns/PatternTable";

import { getAllPatterns } from "@/lib/patterns";

export default async function PatternsPage() {
  const patterns = await getAllPatterns();

  return (
    <InstructorPage
      title="Pattern Library"
      description="Manage pattern drafting articles, downloads, publishing, featuring, and ordering."
    >
      <PatternStats
        totalPatterns={patterns.length}
        publishedPatterns={patterns.filter((p) => p.published).length}
        draftPatterns={patterns.filter((p) => !p.published).length}
        featuredPatterns={patterns.filter((p) => p.featured).length}
      />

      <PatternToolbar />

      <PatternTable patterns={patterns} />
    </InstructorPage>
  );
}