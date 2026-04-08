const UNIVERSITIES = [
  { name: "Harvard University",       color: "#A51C30" },
  { name: "Yale University",          color: "#00356B" },
  { name: "Princeton University",     color: "#FF6B00" },
  { name: "Columbia University",      color: "#003087" },
  { name: "Cornell University",       color: "#B31B1B" },
  { name: "Brown University",         color: "#4E3629" },
  { name: "Dartmouth College",        color: "#00693E" },
  { name: "UPenn",                    color: "#011F5B" },
  { name: "MIT",                      color: "#A31F34" },
  { name: "Stanford University",      color: "#8C1515" },
  { name: "Duke University",          color: "#012169" },
  { name: "Johns Hopkins",            color: "#002D72" },
  { name: "Northwestern University",  color: "#4E2A84" },
  { name: "UC Berkeley",              color: "#003262" },
  { name: "UCLA",                     color: "#2774AE" },
  { name: "Carnegie Mellon",          color: "#C41230" },
  { name: "NYU",                      color: "#57068C" },
  { name: "USC",                      color: "#990000" },
  { name: "Georgetown University",    color: "#041E42" },
  { name: "Vanderbilt University",    color: "#866D4B" },
  { name: "Rice University",          color: "#00205B" },
  { name: "Notre Dame",               color: "#0C2340" },
  { name: "Emory University",         color: "#012169" },
  { name: "Univ. of Michigan",        color: "#00274C" },
  { name: "Univ. of Virginia",        color: "#232D4B" },
];

function UniversityItem({ name, color }: { name: string; color: string }) {
  return (
    <div className="flex items-center gap-2.5 px-6 flex-shrink-0">
      <span
        className="w-3 h-3 rounded-full flex-shrink-0"
        style={{ backgroundColor: color }}
      />
      <span
        className="text-sm font-semibold whitespace-nowrap"
        style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#374151" }}
      >
        {name}
      </span>
    </div>
  );
}

export default function UniversityBanner() {
  return (
    <section className="bg-gray-50 border-y border-gray-100 dark:bg-gray-900 dark:border-gray-800 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 text-center">
        <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
          🎓 합격자 배출 대학교
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
          InHero 학생들이 합격한 대학들
        </p>
      </div>

      {/* Scroll track */}
      <div className="overflow-hidden relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-900 z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-gray-50 to-transparent dark:from-gray-900 z-10 pointer-events-none" />

        <div className="uni-scroll-track flex items-center" style={{ width: "max-content" }}>
          {/* First copy */}
          {UNIVERSITIES.map((u) => (
            <UniversityItem key={`a-${u.name}`} name={u.name} color={u.color} />
          ))}
          {/* Duplicate for seamless loop */}
          {UNIVERSITIES.map((u) => (
            <UniversityItem key={`b-${u.name}`} name={u.name} color={u.color} />
          ))}
        </div>
      </div>
    </section>
  );
}
