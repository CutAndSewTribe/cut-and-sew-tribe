interface Props {
  outcomes: string[];
}

export default function CourseBenefits({
  outcomes,
}: Props) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-neutral-200
        bg-white
        p-8
      "
    >

      <h2
        className="
          text-2xl
          font-bold
          text-neutral-900
        "
      >
        Included in this course
      </h2>

      <div
        className="
          mt-6
          space-y-4
        "
      >

        {outcomes.map((item) => (
          <div
            key={item}
            className="
              flex
              gap-3
            "
          >
            <span
              className="
                font-bold
                text-[#661093]
              "
            >
              ✓
            </span>

            <span
              className="
                text-neutral-700
              "
            >
              {item}
            </span>

          </div>
        ))}

      </div>

    </div>
  );
}