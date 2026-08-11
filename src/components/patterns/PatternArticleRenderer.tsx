import CourseCTA from "./CourseCTA";

interface PatternArticleRendererProps {
content: string;
}

export default function PatternArticleRenderer({
content,
}: PatternArticleRendererProps) {
const sections = content
.split(/^## /gm)
.map((section) => section.trim())
.filter(Boolean);

return ( <div className="prose prose-neutral max-w-none">
{sections.map((section, index) => {
const lines = section.split("\n");
const heading = lines[0];
const body = lines.slice(1).join("\n");


    return (
      <section key={index} className="mb-10">
        {index === 0 ? (
          <div className="whitespace-pre-wrap leading-8 text-neutral-800">
            {section}
          </div>
        ) : (
          <>
            <h2 className="mb-4 text-3xl font-bold text-neutral-900">
              {heading}
            </h2>
            <div className="whitespace-pre-wrap leading-8 text-neutral-800">
              {body}
            </div>
            <CourseCTA />
          </>
        )}
      </section>
    );
  })}
</div>

);
}
