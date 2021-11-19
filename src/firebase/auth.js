import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from '@firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './config';

const register = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const uid = userCredential.user.uid;
    await setDoc(doc(db, 'users', uid), {
      uid,
      name,
      email,
      verfiedEmail: false,
    });
    return [uid, null];
  } catch (error) {
    console.log(`error.message`, error.message);
    return [null, error.message];
  }
}

const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(`error`, error.message);
  }
}

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(`error`, error.message);
  }
}

const resetPasssord = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true }
  } catch (error) {
    console.log(`error`, error.message);
    return { success: false, error: error.message }
  }
}

export {
  register,
  logout,
  login,
  resetPasssord,
}