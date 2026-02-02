"use client";

export type TabConfig<TabKey extends string> = {
  key: TabKey;
  label: React.ReactNode;
};

type TabProps<TabKey extends string> = {
  tabs: TabConfig<TabKey>[];
  tabKey: TabKey;
  onChangeTabKey: (v: TabKey) => void;
};

export const Tab = <TabKey extends string>({
  tabs,
  tabKey,
  onChangeTabKey,
}: TabProps<TabKey>) => {
  return (
    <div
      className="grid bg-gray/10 rounded-xl p-1"
      style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}
    >
      {tabs.map((tab) => {
        const isActive = tab.key === tabKey;

        return (
          <button
            key={String(tab.key)}
            className={`flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-all ${
              isActive ? "bg-primary text-white shadow-sm" : "text-gray/70 hover:bg-white"
            }`}
            onClick={() => onChangeTabKey(tab.key)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};
