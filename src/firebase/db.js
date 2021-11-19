import { db } from "./config";
import { doc, setDoc } from 'firebase/firestore';

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
  }
}

const createImageDocInDB = async (uid, fileName, filePath) => {
  try {
    const filePath = `users/${uid}/${fileName}`;
    await setDoc(doc(db, "images", `${fileName}`), {
      uid,
      filePath,
    });
  } catch (error) {
    console.log(`error`, error.message);
  }
}

export {
  createUserDocInDB,
  createImageDocInDB,
}