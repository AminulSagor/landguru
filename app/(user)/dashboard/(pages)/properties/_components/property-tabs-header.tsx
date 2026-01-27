"use client";

type TabKey = "for-sale" | "wanted" | "my-posts";

const TABS: { key: TabKey; label: string }[] = [
  { key: "for-sale", label: "For Sale" },
  { key: "wanted", label: "Wanted/Needs" },
  { key: "my-posts", label: "My Posts" },
];

export default function PropertyTabs({
  activeTab,
  onChange,
}: {
  activeTab: TabKey;
  onChange: (k: TabKey) => void;
}) {
  return (
    <div className="bg-gray/5 rounded-lg">
      <div className="grid grid-cols-3 gap-2">
        {TABS.map((t) => {
          const active = t.key === activeTab;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => onChange(t.key)}
              className={[
                "h-10 rounded-xl text-sm font-semibold transition cursor-pointer",
                active
                  ? "bg-primary text-white shadow-sm"
                  : "bg-transparent text-black/60 hover:bg-white/70",
              ].join(" ")}
            >
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
