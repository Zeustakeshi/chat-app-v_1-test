import {
    getFirestore,
    doc,
    setDoc,
    updateDoc,
    addDoc,
    getDocs,
    deleteDoc,
    collection,
    onSnapshot,
    arrayRemove,
    arrayUnion,
    where,
    query,
} from "firebase/firestore";

const db = getFirestore();
export {
    where,
    query,
    db,
    doc,
    setDoc,
    updateDoc,
    deleteDoc,
    arrayRemove,
    getDocs,
    addDoc,
    arrayUnion,
    collection,
    onSnapshot,
};
