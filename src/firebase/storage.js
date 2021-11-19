import { storage } from './config';
import { ref, uploadBytes } from "firebase/storage";

const saveCanvasImage = async (uid, fileName, file) => {
  try {
    const storageRef = ref(storage, `users/${uid}/${fileName}`);

    // 'file' comes from the Blob or File API
    const snapshot = await uploadBytes(storageRef, file);
    console.log(`snapshot`, snapshot);
  } catch (error) {
    console.log(`error`, error.message);
  }
}

export {
  saveCanvasImage,
}