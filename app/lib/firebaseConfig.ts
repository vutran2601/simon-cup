  // firebaseConfig.js
  import { initializeApp } from "firebase/app";
  import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAVi73HE4qbgIw2ucIMMNqIzzap3qklN8Q",
  authDomain: "my-project-c3168.firebaseapp.com",
  projectId: "my-project-c3168",
  storageBucket: "my-project-c3168.firebasestorage.app",
  messagingSenderId: "564279952025",
  appId: "1:564279952025:web:571a8f9c04d02cf321ae08",
  measurementId: "G-5CJ2BY1RZX"
};

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  export { auth, provider };
  