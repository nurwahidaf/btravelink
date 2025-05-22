import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { app } from './config';

// Initialize Firebase Authentication
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
