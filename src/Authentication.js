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
  if (res?.user?.uid) {
    const userRef = doc(db, "Users", res?.user?.uid);
    const userDetails = getDoc(userRef);
    const user = (await userDetails).data();
    return user;
  }
};
export const handleAddMovie = async (data) => {
  console.log('====================================');
  console.log(data);
  console.log('====================================');
  if (data?.user) {
    const updatedUser = {
      name: data?.user?.name,
      email: data?.user?.email,
      password: data?.user?.password,
      movies: [
        {
          Title: data?.data?.Title,
          Poster: data?.data?.Poster,
          Year: data?.data?.Year,
          id: data?.user?.id,
        },
      ],
    };
    setDoc(doc(db, "Users", data?.user?.id), updatedUser);
    return updatedUser;
  }
};
