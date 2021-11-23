import { storage, db } from './config';
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

const saveImageToStorage = async (uid, fileName, file) => {
  try {
    const filePath = `users/${uid}/${fileName}`;
    const storageRef = ref(storage, filePath);

    // 'file' comes from the Blob or File API
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    await setDoc(doc(db, "images", `${fileName}`), {
      uid,
      filePath,
      downloadURL,
    });
    alert("image saved to Gallery");
  } catch (error) {
    console.log(`error`, error.message);
    alert(error.message);
  }
}

export {
  saveImageToStorage,
}