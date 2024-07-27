import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "./Firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const handleCreateNewUser = async (userDetails) => {
  const res = await createUserWithEmailAndPassword(
    auth,
    userDetails?.email,
    userDetails?.password
  );
  if (res?.user) {
    const newUser = {
      name: userDetails?.name,
      email: userDetails?.email,
      password: userDetails?.password,
      id: res?.user?.uid,
    };
    setDoc(doc(db, "Users", res?.user?.uid), newUser);
    return newUser;
  }
};

export const handleloginUser = async (userDetails) => {
  const res = await signInWithEmailAndPassword(
    auth,
    userDetails?.email,
    userDetails?.password
  );
  console.log(res, "signInWithEmailAndPassword");
  if (res?.user?.uid) {
    const userRef = doc(db, "Users", res?.user?.uid);
    const userDetails = getDoc(userRef);
    const user = (await userDetails).data();
    return user;
  }
};
