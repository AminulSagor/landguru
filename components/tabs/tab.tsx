"use client";

export type TabConfig<TabKey extends string> = {
  key: TabKey;
  label: string;
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
    <div className="grid grid-cols-2 bg-gray/20 rounded-lg py-1 px-2 text-center">
      {tabs.map((tab) => {
        const isActive = tab.key === tabKey;
        return (
          <button
            key={tab.key}
            className={`flex px-2 w-full py-2 rounded-lg items-center justify-center cursor-pointer ${isActive && "bg-primary text-white"}`}
            onClick={() => onChangeTabKey(tab.key)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};
