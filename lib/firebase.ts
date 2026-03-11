/**
 * Firebase initialization
 *
 * Provides a singleton Firebase app, Analytics, Firestore, and Anonymous Auth.
 * All services are lazily initialized and only run on the client side.
 *
 * Required env vars (NEXT_PUBLIC_ prefix for client-side access):
 *   NEXT_PUBLIC_FIREBASE_API_KEY
 *   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
 *   NEXT_PUBLIC_FIREBASE_PROJECT_ID
 *   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
 *   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
 *   NEXT_PUBLIC_FIREBASE_APP_ID
 *   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
 */

import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import {
  getAnalytics,
  isSupported as isAnalyticsSupported,
  type Analytics,
} from 'firebase/analytics';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getAuth, signInAnonymously, onAuthStateChanged, type Auth } from 'firebase/auth';

// ─── Config ──────────────────────────────────────────────────────────────────

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// ─── Singletons ──────────────────────────────────────────────────────────────

let app: FirebaseApp | null = null;
let analytics: Analytics | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;

/** Whether Firebase is configured (all required env vars present) */
export function isFirebaseConfigured(): boolean {
  return !!(firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId);
}

function ensureApp(): FirebaseApp {
  if (!app) {
    app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
  }
  return app;
}

// ─── Analytics ───────────────────────────────────────────────────────────────

export async function getFirebaseAnalytics(): Promise<Analytics | null> {
  if (typeof window === 'undefined' || !isFirebaseConfigured()) return null;
  if (analytics) return analytics;
  try {
    const supported = await isAnalyticsSupported();
    if (!supported) return null;
    analytics = getAnalytics(ensureApp());
    return analytics;
  } catch {
    return null;
  }
}

// ─── Firestore ───────────────────────────────────────────────────────────────

export function getFirebaseFirestore(): Firestore | null {
  if (typeof window === 'undefined' || !isFirebaseConfigured()) return null;
  if (db) return db;
  db = getFirestore(ensureApp());
  return db;
}

// ─── Auth (Anonymous) ────────────────────────────────────────────────────────

let uidPromise: Promise<string | null> | null = null;

/** Get or create an anonymous user ID. Returns the same UID across the session. */
export function getAnonymousUid(): Promise<string | null> {
  if (typeof window === 'undefined' || !isFirebaseConfigured()) {
    return Promise.resolve(null);
  }

  if (uidPromise) return uidPromise;

  uidPromise = new Promise((resolve) => {
    try {
      auth = auth || getAuth(ensureApp());
      // If already signed in, return immediately
      if (auth.currentUser) {
        resolve(auth.currentUser.uid);
        return;
      }
      // Listen for auth state, then sign in anonymously
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        if (user) {
          resolve(user.uid);
        } else {
          signInAnonymously(auth!)
            .then((cred) => resolve(cred.user.uid))
            .catch(() => resolve(null));
        }
      });
    } catch {
      resolve(null);
    }
  });

  return uidPromise;
}
