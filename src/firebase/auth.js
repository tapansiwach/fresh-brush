import { createUserWithEmailAndPassword } from '@firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './config';

const register = async (name, email, password) => {
  console.log(`name`, name);
  console.log(`email`, email);
  console.log(`password`, password);
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const uid = userCredential.user.uid;
    console.log(`uid`, userCredential.user.uid);
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

export {
  register,
}