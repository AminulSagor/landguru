import NotificationDetail from "@/components/notifications/notification-detail";

type Props = {
  params: { id: string };
};

export default function NotificationPage({ params }: Props) {
  const { id } = params;

  return <NotificationDetail id={id} />;
}
