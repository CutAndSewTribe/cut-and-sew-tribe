import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';

interface Props {
content: string;
}

export default function PatternArticleRenderer({ content }: Props) {
const parts = content
.split(/^##\s+/m)
.filter(Boolean);

return ( <article className='prose prose-neutral max-w-none prose-headings:text-neutral-900 prose-a:text-[#661093]'>
{parts.map((section, index) => {
const lines = section.split('\n');
const heading = index === 0 ? null : lines.shift();


    return (
      <section key={index} className='mb-12'>
        {heading && (
          <h2 className='mb-4 text-3xl font-bold'>
            {heading}
          </h2>
        )}

        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {index === 0 ? section : lines.join('\n')}
        </ReactMarkdown>

        <div className='mt-8 rounded-3xl border border-[#D4AF37]/30 bg-[#661093]/5 p-6'>
          <h3 className='text-xl font-semibold text-[#661093]'>
            Ready to take your fashion skills further?
          </h3>

          <p className='mt-2 text-neutral-700'>
            This pattern is part of a larger learning journey. Explore our complete
            fashion design, sewing, and pattern drafting courses.
          </p>

          <Link
            href='/courses'
            className='mt-4 inline-flex items-center rounded-xl bg-[#661093] px-5 py-3 font-semibold text-white hover:bg-[#7A16AF]'
          >
            Browse All Courses
          </Link>
        </div>
      </section>
    );
  })}
</article>

);
}
