"use client";

import TaskCard from "@/app/(agent)/agent/dashboard/tasks/_components/task-card";
import { TaskItem } from "@/app/(agent)/agent/dummy-data/mock-tasks";



export default function TaskGrid({ items }: { items: TaskItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {items.map((t) => (
        <TaskCard key={t.id} item={t} />
      ))}
    </div>
  );
}
