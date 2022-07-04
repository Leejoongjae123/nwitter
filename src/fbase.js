import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import 'firebase/database'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyADF9GPp4y3fP9YpE1a1FUT-xvoHxvZ36M",
    authDomain: "nwitter-88c43.firebaseapp.com",
    databaseURL: "https://nwitter-88c43-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "nwitter-88c43",
    storageBucket: "nwitter-88c43.appspot.com",
    messagingSenderId: "59104342669",
    appId: "1:59104342669:web:917ecf5ffd7eb8386828c4"
};

// export default initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
export const authService = getAuth();
export const dbService = getFirestore();
