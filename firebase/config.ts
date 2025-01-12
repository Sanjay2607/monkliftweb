import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBjilIeqf1K4dxl3XQqAqGx9IRopo625oI",
  authDomain: "monklift-27e0a.firebaseapp.com",
  projectId: "monklift-27e0a",
  storageBucket: "monklift-27e0a.firebasestorage.app",
  messagingSenderId: "570721933495",
  appId: "1:570721933495:web:d1eec201a4a5eeb2d5d532",
  measurementId: "G-3QYPP9C9H8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Make sure to export these
export { auth, googleProvider };
export default app;