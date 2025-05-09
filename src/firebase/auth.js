import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { app } from "./config";

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
