"use client";

import { useState } from "react";
import { ChevronDown, ShieldCheck } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Is this course suitable for complete beginners?",
    answer:
      "Yes. Most Cut and Sew Tribe courses are structured step by step, so you can start with little or no prior sewing experience. If a course requires previous knowledge, it will be clearly stated on the course page.",
  },
  {
    question: "How long will I have access after enrolling?",
    answer:
      "You get lifetime access to the course. You can watch the lessons, download resources, and revisit the material whenever you need it.",
  },
  {
    question: "Will I receive patterns and downloadable resources?",
    answer:
      "Yes. Courses include downloadable resources such as patterns, measurement guides, templates, sewing checklists, and other materials that support the lessons.",
  },
  {
    question: "Do I get support if I have questions while learning?",
    answer:
      "Yes. Enrolled students receive access to the course community, where you can ask questions, get feedback, and learn alongside other fashion students.",
  },
  {
    question: "Can I watch the lessons on my phone?",
    answer:
      "Absolutely. The lessons can be accessed on mobile phones, tablets, and computers, so you can learn wherever it is most convenient for you.",
  },
  {
    question: "What happens immediately after payment?",
    answer:
      "Once your payment is confirmed, your enrollment is activated and you will receive immediate access to the course and any included community or downloadable resources.",
  },
  {
    question: "Is there a certificate of completion?",
    answer:
      "Yes. Students who complete the course curriculum can receive a Cut and Sew Tribe certificate of completion, which is useful for showcasing your skills and portfolio progress.",
  },
  {
    question: "Will this help me start a fashion business?",
    answer:
      "Many of our courses are designed not only to teach garment construction but also pricing, client work, production workflows, and fashion business fundamentals, making them valuable for aspiring entrepreneurs.",
  },
];

export default function CourseFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm lg:p-10">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#661093]/10 text-[#661093]">
          <ShieldCheck className="h-6 w-6" />
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#661093]">
            Frequently asked questions
          </p>
          <h2 className="mt-1 text-3xl font-bold text-neutral-900 lg:text-4xl">
            Everything you need to know before enrolling
          </h2>
        </div>
      </div>

      <div className="mt-8 divide-y divide-neutral-200">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={faq.question}
              className="py-4"
            >
              <button
                type="button"
                onClick={() =>
                  setOpenIndex(isOpen ? null : index)
                }
                className="flex w-full items-center justify-between gap-4 text-left"
              >
                <h3 className="text-lg font-semibold text-neutral-900">
                  {faq.question}
                </h3>

                <ChevronDown
                  className={`h-5 w-5 flex-shrink-0 text-neutral-500 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="mt-3 pr-8">
                  <p className="leading-7 text-neutral-600">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl bg-[#F8F7FA] p-6">
        <h3 className="text-lg font-semibold text-neutral-900">
          Still have a question?
        </h3>

        <p className="mt-2 text-neutral-600">
          Contact the Cut and Sew Tribe team and we’ll help you choose the right
          course for your skill level and fashion goals.
        </p>

        <a
          href="mailto:hello@cutandsewtribe.com"
          className="mt-4 inline-flex items-center rounded-xl bg-[#661093] px-5 py-3 font-semibold text-white transition hover:bg-[#4E0C70]"
        >
          Contact support
        </a>
      </div>
    </section>
  );
}