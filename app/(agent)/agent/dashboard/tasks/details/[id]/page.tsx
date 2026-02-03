import TaskDetails from "@/app/(agent)/agent/dashboard/tasks/_components/task-details";

export default async function TaskDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const param = await params;

  return <TaskDetails id={param.id} />;
}
