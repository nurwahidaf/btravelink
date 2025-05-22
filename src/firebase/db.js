import { getFirestore } from 'firebase/firestore';
import { app } from './config';

// Initialize Cloud Firestore
const db = getFirestore(app);

export { db };
