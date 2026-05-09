/*
  Firebase Messaging Service Worker
  ---------------------------------
  This service worker receives background messages from Firebase Cloud Messaging
  and shows notifications. Replace the firebaseConfig object below with your
  project's values (or copy this file from your Firebase console generated SW).

  Notes:
  - This file must live in the `public/` directory so it's served at `/firebase-messaging-sw.js`.
  - Use the same Firebase project config in your client app (NEXT_PUBLIC_ env vars).
*/

importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js');

// Firebase config for LandBuySell (inlined per user request)
const firebaseConfig = {
  apiKey: NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const title = payload?.notification?.title || 'Background Notification';
  const options = {
    body: payload?.notification?.body || '',
    icon: '/favicon.ico',
    // Preserve any data payload so notificationclick can surface details
    data: payload?.data || payload?.notification?.data || {},
  };

  self.registration.showNotification(title, options);
});

// Also listen to raw push events to aid debugging: some payloads may arrive
// as raw push events where `onBackgroundMessage` is not invoked. Log the
// event and try to show a notification if data is present.
self.addEventListener('push', function (event) {
  try {
    // eslint-disable-next-line no-console
    console.log('[firebase-messaging-sw.js] push event', event);

    if (event.data) {
      let data = null;
      try {
        data = event.data.json();
      } catch (e) {
        // not JSON, use text
        data = { text: event.data.text() };
      }

      // eslint-disable-next-line no-console
      console.log('[firebase-messaging-sw.js] push data', data);

      // Try to derive notification details
      const title = (data?.notification?.title) || (data?.title) || 'Push Message';
      const body = (data?.notification?.body) || (data?.body) || data?.text || '';

      const options = {
        body,
        icon: '/favicon.ico',
        data: data,
      };

      event.waitUntil(self.registration.showNotification(title, options));
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[firebase-messaging-sw.js] push handler error', err);
  }
});

self.addEventListener('notificationclick', function (event) {
  const notification = event.notification;
  const data = notification?.data || {};
  // eslint-disable-next-line no-console
  console.log('[firebase-messaging-sw.js] notificationclick', { data });
  notification.close();

  // Try to focus an existing client and postMessage the notification data
  // so the app can open a popup/modal. If no client exists, open a new
  // window and deep-link into the notification detail page.
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
      // eslint-disable-next-line no-console
      console.log('[firebase-messaging-sw.js] clients found', clientList.length);
      // Prefer a visible client
      for (const client of clientList) {
        // eslint-disable-next-line no-console
        console.log('[firebase-messaging-sw.js] client', { url: client.url, visibilityState: client.visibilityState });
        if (client.visibilityState === 'visible' && 'focus' in client) {
          return client.focus().then(() => {
            try {
              // eslint-disable-next-line no-console
              console.log('[firebase-messaging-sw.js] posting message to visible client', client.url);
              client.postMessage({ type: 'notification:click', data });
            } catch (e) {
              // ignore
            }
          });
        }
      }

      // If there is any client, focus the first and post a message
      if (clientList.length > 0) {
        const client = clientList[0];
        if ('focus' in client) {
          // eslint-disable-next-line no-console
          console.log('[firebase-messaging-sw.js] posting message to first client', client.url);
          return client.focus().then(() => {
            try {
              client.postMessage({ type: 'notification:click', data });
            } catch (e) {}
          });
        }
      }

      // No clients - open a new window. If the payload contains a notificationId,
      // deep-link to the notification detail route; otherwise pass data via query.
      if (clients.openWindow) {
        try {
          if (data && data.notificationId) {
            const url = '/notifications/' + encodeURIComponent(data.notificationId);
            // eslint-disable-next-line no-console
            console.log('[firebase-messaging-sw.js] opening window', url);
            return clients.openWindow(url);
          }
          const encoded = encodeURIComponent(JSON.stringify(data || {}));
          const url = '/notifications/popup?data=' + encoded;
          // eslint-disable-next-line no-console
          console.log('[firebase-messaging-sw.js] opening window', url);
          return clients.openWindow(url);
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error('[firebase-messaging-sw.js] openWindow error', e);
          return clients.openWindow('/');
        }
      }
    }),
  );
});
