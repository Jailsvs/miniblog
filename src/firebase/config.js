import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDQOufR57xfG6vHqUWul9HrI8xdM3MSjsM",
  authDomain: "miniblog-443d2.firebaseapp.com",
  projectId: "miniblog-443d2",
  storageBucket: "miniblog-443d2.appspot.com",
  messagingSenderId: "623555390802",
  appId: "1:623555390802:web:835a42358200fc11b49e8b"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export {db};