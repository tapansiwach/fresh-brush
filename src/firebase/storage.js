import { storage } from './config';
import { ref, uploadBytes } from "firebase/storage";

const saveImageToStorage = async (uid, fileName, file) => {
  try {
    const filePath = `users/${uid}/${fileName}`;
    const storageRef = ref(storage, filePath);

    // 'file' comes from the Blob or File API
    await uploadBytes(storageRef, file);
  } catch (error) {
    console.log(`error`, error.message);
  }
}

export {
  saveImageToStorage,
}