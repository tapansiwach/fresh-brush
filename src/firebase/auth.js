import { createUserWithEmailAndPassword } from '@firebase/auth';
import { auth, db } from './config';

const register = async (name, email, password) => {
  console.log(`name`, name);
  console.log(`email`, email);
  console.log(`password`, password);
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    console.log(`userCredential`, userCredential);
    const uid = userCredential.user.uid;
    console.log(`uid`, userCredential.user.uid);
  } catch (error) {
    console.log(`error.message`, error.message);
  }
}

export {
  register,
}