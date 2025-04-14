import { app } from "./config";
import { getFirestore } from "firebase/firestore";

// Initialize Cloud Firestore
const db = getFirestore(app);

export { db };
