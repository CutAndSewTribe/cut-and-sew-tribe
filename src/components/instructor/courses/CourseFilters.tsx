"use client";

interface Props {
  category: string;
  level: string;
  status: string;
  featured: string;

  onCategoryChange: (value: string) => void;
  onLevelChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onFeaturedChange: (value: string) => void;

  onReset: () => void;
}

const categories = [
  "All",
  "Dressmaking",
  "Bridal",
  "Menswear",
  "Business",
];

const levels = [
  "All",
  "Beginner",
  "Intermediate",
  "Advanced",
];

const statuses = [
  "All",
  "Published",
  "Draft",
];

const featuredOptions = [
  "All",
  "Featured",
  "Not Featured",
];

export default function CourseFilters({
  category,
  level,
  status,
  featured,
  onCategoryChange,
  onLevelChange,
  onStatusChange,
  onFeaturedChange,
  onReset,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3">

      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="
          rounded-xl
          border
          border-neutral-300
          bg-white
          px-4
          py-2.5
          text-sm
          shadow-sm
          outline-none
          transition
          focus:border-[#661093]
          focus:ring-2
          focus:ring-[#661093]/20
        "
      >
        {categories.map((item) => (
          <option
            key={item}
            value={item}
          >
            {item}
          </option>
        ))}
      </select>

      <select
        value={level}
        onChange={(e) => onLevelChange(e.target.value)}
        className="
          rounded-xl
          border
          border-neutral-300
          bg-white
          px-4
          py-2.5
          text-sm
          shadow-sm
          outline-none
          transition
          focus:border-[#661093]
          focus:ring-2
          focus:ring-[#661093]/20
        "
      >
        {levels.map((item) => (
          <option
            key={item}
            value={item}
          >
            {item}
          </option>
        ))}
      </select>

      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="
          rounded-xl
          border
          border-neutral-300
          bg-white
          px-4
          py-2.5
          text-sm
          shadow-sm
          outline-none
          transition
          focus:border-[#661093]
          focus:ring-2
          focus:ring-[#661093]/20
        "
      >
        {statuses.map((item) => (
          <option
            key={item}
            value={item}
          >
            {item}
          </option>
        ))}
      </select>

      <select
        value={featured}
        onChange={(e) => onFeaturedChange(e.target.value)}
        className="
          rounded-xl
          border
          border-neutral-300
          bg-white
          px-4
          py-2.5
          text-sm
          shadow-sm
          outline-none
          transition
          focus:border-[#661093]
          focus:ring-2
          focus:ring-[#661093]/20
        "
      >
        {featuredOptions.map((item) => (
          <option
            key={item}
            value={item}
          >
            {item}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={onReset}
        className="
          rounded-xl
          border
          border-neutral-300
          bg-white
          px-5
          py-2.5
          text-sm
          font-medium
          transition
          hover:bg-neutral-100
        "
      >
        Reset Filters
      </button>

    </div>
  );
}