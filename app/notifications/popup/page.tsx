import NotificationDetail from "@/components/notifications/notification-detail";

type Props = {
  searchParams?: { data?: string };
};

export default function NotificationPopupPage({ searchParams }: Props) {
  const raw = searchParams?.data ?? null;
  let parsed: any = null;

  if (raw) {
    try {
      parsed = JSON.parse(decodeURIComponent(raw));
    } catch (e) {
      // ignore parse errors
      parsed = null;
    }
  }

  const notificationId = parsed?.notificationId ?? null;

  if (notificationId) {
    return <NotificationDetail id={String(notificationId)} />;
  }

  return (
    <div className="max-w-3xl mx-auto py-12">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="text-xl font-bold">Notification</h1>
        <p className="mt-3 text-sm text-gray-600">No `notificationId` found in the payload.</p>
        <p className="mt-2 text-sm text-gray-500">If the service worker opened this page, try clicking the notification again or send a payload that contains `notificationId`.</p>
      </div>
    </div>
  );
}
