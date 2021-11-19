import { storage, db } from './config';
import { ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

const saveCanvasImage = async (uid, fileName, file) => {
  try {
    const filePath = `users/${uid}/${fileName}`;
    const storageRef = ref(storage, filePath);

    // 'file' comes from the Blob or File API
    const snapshot = await uploadBytes(storageRef, file);
    await setDoc(doc(db, "images", `${fileName}`), {
      uid,
      filePath,
    });
  } catch (error) {
    console.log(`error`, error.message);
  }
}

export {
  saveCanvasImage,
}