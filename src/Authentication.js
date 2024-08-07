import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "./Firebase";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

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

export const handleFetchWatcList = async (user) => {
  const userRef = doc(db, "Users", user?.id);
  const userDetails = getDoc(userRef);
  const User = (await userDetails).data();
  return User?.movies;
};

export const handleAddMovie = async (data) => {
  if (data?.user) {
    const userDocRef = doc(db, "Users", data?.user?.id);
    await updateDoc(userDocRef, {
      movies: arrayUnion(data?.data),
    });
    return data?.data;
  }
};
export const handleDeleteMovie = async (data) => {
  if (data?.user) {
    const userRef = doc(db, "Users", data?.user?.id);
    const userDetails = getDoc(userRef);
    const getMovies = (await userDetails).data()?.movies;
    if (getMovies) {
      const updatedMovies = getMovies.filter((res) => {
        return res.imdbID !== data?.movie.imdbID;
      });
      await updateDoc(userRef, {
        movies: updatedMovies,
      });
    }
  }
};
