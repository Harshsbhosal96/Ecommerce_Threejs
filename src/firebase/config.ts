import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';

export interface FirebaseConfigStatus {
    isConfigured: boolean;
    missingKeys: string[];
    message: string;
}

const firebaseEnv = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
};

const requiredConfigEntries = [
    { key: 'REACT_APP_FIREBASE_API_KEY', value: firebaseEnv.apiKey },
    { key: 'REACT_APP_FIREBASE_AUTH_DOMAIN', value: firebaseEnv.authDomain },
    { key: 'REACT_APP_FIREBASE_PROJECT_ID', value: firebaseEnv.projectId },
    { key: 'REACT_APP_FIREBASE_APP_ID', value: firebaseEnv.appId },
    { key: 'REACT_APP_FIREBASE_MESSAGING_SENDER_ID', value: firebaseEnv.messagingSenderId },
    { key: 'REACT_APP_FIREBASE_STORAGE_BUCKET', value: firebaseEnv.storageBucket },
];

const missingKeys = requiredConfigEntries
    .filter((entry) => !entry.value)
    .map((entry) => entry.key);

export const firebaseConfigStatus: FirebaseConfigStatus = {
    isConfigured: missingKeys.length === 0,
    missingKeys,
    message: missingKeys.length === 0
        ? 'Firebase authentication is ready.'
        : `Firebase authentication is not configured yet. Add the missing environment variables: ${missingKeys.join(', ')}`,
};

let firebaseApp: FirebaseApp | null = null;
let firebaseAuth: Auth | null = null;

if (firebaseConfigStatus.isConfigured) {
    firebaseApp = getApps().length ? getApp() : initializeApp(firebaseEnv);
    firebaseAuth = getAuth(firebaseApp);
}

export { firebaseApp, firebaseAuth };