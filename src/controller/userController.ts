import { auth } from "@/config/firebaseConfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import Cookies from "js-cookie";
import { User } from "@/entities/user";

export const firebaseLogin = async (email: string, password: string) => {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
}

export const getUserData = async() => {
  const res = await fetch('api/users', {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await res.json()
  return data
}

export const updateUserData = async(data: User) => {
  const res = await fetch('api/users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  const resData = await res.json()
  return resData
}

export const logout = async() => {
  try {
    await signOut(auth);
    Cookies.remove('accessToken');
  } catch (error) {
    console.log(error);
  };
}