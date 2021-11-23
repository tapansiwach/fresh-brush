import { db } from "./config";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

const createUserDocInDB = async (uid, name, email) => {
  try {
    await setDoc(doc(db, 'users', uid), {
      uid,
      name,
      email,
      verfiedEmail: false,
    });
  } catch (error) {
    console.log(`error`, error.message);
    alert(error.message);
  }
}

const getImageDocs = async (uid) => {
  try {
    if (uid) {
      const q = query(collection(db, "images"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      return querySnapshot;
    }
  } catch (error) {
    console.log(`error`, error.message);
    alert(error.message);
  }
}

export {
  createUserDocInDB,
  getImageDocs,
}