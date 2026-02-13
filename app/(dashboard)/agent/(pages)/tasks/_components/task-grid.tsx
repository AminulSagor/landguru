"use client";

import TaskCard from "@/app/(dashboard)/agent/(pages)/tasks/_components/task-card";
import { TaskItem } from "@/app/(dashboard)/agent/dummy-data/mock-tasks";

export default function TaskGrid({ items }: { items: TaskItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {items.map((t) => (
        <TaskCard key={t.id} item={t} />
      ))}
    </div>
  );
}
