// src/firebase/auth.js
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { app } from "./config";
// import app from "./config";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
