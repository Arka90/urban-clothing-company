// import { initializeApp } from "firebase/app";
// import {
//   getAuth,
//   signInWithRedirect,
//   signInWithPopup,
//   GoogleAuthProvider,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
// } from "firebase/auth";

// import {
//   getFirestore,
//   doc,
//   getDoc,
//   setDoc,
//   collection,
//   writeBatch,
//   query,
//   getDocs,
// } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyClHcmBnStcNMaH_reep4JyEPt_zu1Zc68",
//   authDomain: "urban-clothing-db-c72e3.firebaseapp.com",
//   projectId: "urban-clothing-db-c72e3",
//   storageBucket: "urban-clothing-db-c72e3.appspot.com",
//   messagingSenderId: "649796424962",
//   appId: "1:649796424962:web:89d247b0c7a47e79f55e1b",
// };

// const firebaseApp = initializeApp(firebaseConfig);

// const provider = new GoogleAuthProvider();

// provider.setCustomParameters({
//   prompt: "select_account",
// });

// export const auth = getAuth();

// export const singInWithGooglePopup = () => signInWithPopup(auth, provider);
// export const signInWIthGoogleRedirect = () =>
//   signInWithRedirect(auth, provider);

// export const addCollectionAndDocuments = async (
//   collectionKey,
//   objectsToAdd
// ) => {
//   const collectionRef = collection(db, collectionKey);
//   const batch = writeBatch(db);

//   objectsToAdd.forEach((object) => {
//     const docRef = doc(collectionRef, object.title.toLowerCase());
//     batch.set(docRef, object);
//   });

//   await batch.commit();
//   console.log("done");
// };

// export const getCategoriesAndDocuments = async () => {
//   const collectionRef = collection(db, "categories");

//   const q = query(collectionRef);

//   const querySnapshot = await getDocs(q);

//   return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
// };

// export const db = getFirestore();

// export const createUserDocumentFromAuth = async (
//   userAuth,
//   additionalInformation = {}
// ) => {
//   if (!userAuth) return;
//   const userDocRef = doc(db, "users", userAuth.uid);
//   // console.log(userDocRef);
//   const userSnapshot = await getDoc(userDocRef);
//   // console.log(userSnapshot);

//   if (!userSnapshot.exists()) {
//     const { displayName, email } = userAuth;
//     const createdAt = new Date();

//     try {
//       await setDoc(userDocRef, {
//         displayName,
//         email,
//         createdAt,
//         ...additionalInformation,
//       });
//     } catch (error) {
//       if (error.code === "auth/email-already-in-use") {
//         alert("User alredy exists please login");
//       } else {
//         console.log("Error creating user", error.message);
//       }
//     }
//   }

//   return userSnapshot;
// };

// export const createAuthUserWithEmailAndPassword = async (email, password) => {
//   if (!email || !password) return;
//   return await createUserWithEmailAndPassword(auth, email, password);
// };

// export const signInAuthUserWithEmailAndPassword = async (email, password) => {
//   if (!email || !password) return;
//   return await signInWithEmailAndPassword(auth, email, password);
// };

// export const signOutUser = async () => signOut(auth);

// export const onAuthStateChangedListener = (callback) =>
//   onAuthStateChanged(auth, callback);

// export const getCurrentUser = () => {
//   return new Promise((resolve, reject) => {
//     const unsuscribe = onAuthStateChanged(
//       auth,
//       (userAuth) => {
//         unsuscribe();
//         resolve(userAuth);
//       },
//       reject
//     );
//   });
// };

// ******************************************************
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyClHcmBnStcNMaH_reep4JyEPt_zu1Zc68",
  authDomain: "urban-clothing-db-c72e3.firebaseapp.com",
  projectId: "urban-clothing-db-c72e3",
  storageBucket: "urban-clothing-db-c72e3.appspot.com",
  messagingSenderId: "649796424962",
  appId: "1:649796424962:web:89d247b0c7a47e79f55e1b",
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
  field
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userSnapshot;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
