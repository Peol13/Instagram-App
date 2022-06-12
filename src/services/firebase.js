import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set, get as FBget, onChildAdded } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import {getStorage, ref as storageRef, uploadBytes, getDownloadURL} from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export const auth = getAuth(app);

export const observe = (url, callback) =>
  onValue(ref(database, `${url}/`), (snapshot) => {
    const data = snapshot.val();
    // przekazalismy setMessages jako callback, poniewaz chcemy uruchomic tą funkcje za kazdym razem jak zmieniaja sie dane
    callback(Object.values(data ?? {}));
  });

  export const observeOnlyNew = (url, callback) =>
  onChildAdded(ref(database, `${url}/`), (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });

export const save = (url, data) => {
  const newRecordId = Date.now();

  return set(ref(database, `${url}/${newRecordId}`), {
    id: newRecordId,
    ...data,
  });
};

export const update = (url, data) => set(ref(database, url), data);

export const get = (url) => FBget(ref(database, url)).then((data) => data.val());

export const registerUser = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const loginUser = (email, password) => signInWithEmailAndPassword(auth, email, password);

export const singOutUser = () => signOut(auth);

export const updateUserProfile = () => updateProfile(auth); 

 const storage = getStorage();

export const addFileToStorage = (file) =>{
  console.log(file) 

  const fileDestination = storageRef(storage, `files/${file.name}`)

 return  uploadBytes(fileDestination, file)
  .then(()=> getDownloadURL(fileDestination)
  );
}