"use client";

import React from "react";
import toast from "react-hot-toast";
import { getUserRole } from "@/utils/cookies.utils";
import { pushService } from "@/service/notifications/push.service";

export default function FCMRegister() {
  React.useEffect(() => {
    let registeredToken: string | null = null;
    if (typeof window === "undefined") return;

    // Only register FCM for agents
    if (getUserRole() !== "agent") return;

    let mounted = true;

    const init = async () => {
      try {
        if (!('Notification' in window)) return;

        // Request permission if not decided
        if (Notification.permission === 'default') {
          const perm = await Notification.requestPermission();
          if (perm !== 'granted') return;
        } else if (Notification.permission !== 'granted') {
          return;
        }

        // Register the service worker (served from /firebase-messaging-sw.js)
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');

        // Dynamically import modular Firebase client libs
        const { initializeApp, getApps } = await import('firebase/app');
        const messagingModule = await import('firebase/messaging');
        const { getMessaging, getToken, onMessage } = messagingModule;

        // Default firebase config provided by user (used as fallback)
        const DEFAULT_FIREBASE_CONFIG = {
          apiKey: "AIzaSyC1SQ6jXflVeT8lBYfq3a6mNIMRdhVwekA",
          authDomain: "landbuysell-b1fd9.firebaseapp.com",
          projectId: "landbuysell-b1fd9",
          storageBucket: "landbuysell-b1fd9.firebasestorage.app",
          messagingSenderId: "406307965561",
          appId: "1:406307965561:web:87a402907ddc8948afe2a8",
          measurementId: "G-X0B0M4VE4F",
        };

        const firebaseConfig = {
          apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? DEFAULT_FIREBASE_CONFIG.apiKey,
          authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? DEFAULT_FIREBASE_CONFIG.authDomain,
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? DEFAULT_FIREBASE_CONFIG.projectId,
          storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? DEFAULT_FIREBASE_CONFIG.storageBucket,
          messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? DEFAULT_FIREBASE_CONFIG.messagingSenderId,
          appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? DEFAULT_FIREBASE_CONFIG.appId,
          measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? DEFAULT_FIREBASE_CONFIG.measurementId,
        };

        if (!getApps().length) initializeApp(firebaseConfig);

        const messaging = getMessaging();

        const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY || undefined;
        const fcmToken = await getToken(messaging, { vapidKey, serviceWorkerRegistration: registration });
        
        if (!fcmToken) {
          console.warn('FCM: no token retrieved');
          return;
        }

        registeredToken = fcmToken;
        // Log token for debugging (copy this to send test pushes)
        // Visible in browser console (page context)
        // Also useful if you can't find the POST payload in Network tab
        // eslint-disable-next-line no-console
        console.log("FCM token:", fcmToken);

        // Register token with backend
        await pushService.registerDevice(fcmToken, 'web');
        console.info('FCM registered with backend');
        console.log('FCM token:', fcmToken);

        // Handle foreground messages
        onMessage(messaging, (payload) => {
          const title = payload?.notification?.title ?? 'Notification';
          const body = payload?.notification?.body ?? '';
          toast(`${title}${body ? ` — ${body}` : ''}`);
          // let other parts of the app refresh notifications list
          window.dispatchEvent(new Event('notifications:refresh'));
        });
      } catch (err) {
        // Keep failure silent but log for debugging
        // eslint-disable-next-line no-console
        console.error('FCM registration failed', err);
      }
    };

    init();

    return () => {
      if (!mounted) return;
      mounted = false;
      if (registeredToken) {
        pushService.unregisterDevice(registeredToken).catch(() => {});
      }
    };
  }, []);

  return null;
}
